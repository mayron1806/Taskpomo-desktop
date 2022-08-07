import Modal from "react-modal";
import * as C from "./style";
import * as M from "../style";
import React, { Dispatch, FormEvent, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ThemeContext } from "styled-components";
import { ModalStyle } from "../../../styles/ModalStyle";
import { IoClose } from "react-icons/io5";
import {AiOutlineFile, AiOutlineFileAdd, AiOutlineFileExcel} from "react-icons/ai";
import SendButton from "../../SendButton";
import { acceptedFilesFormats, MAX_FILE_SIZE } from "../../../config/Files";
import { getBackgrounds, saveFiles } from "../../../services/File";
import BackgroundType from "../../../types/Background";

type props ={
    isOpen: boolean,
    closeModal: () => void,
    background: BackgroundType,
    setBackground: Dispatch<React.SetStateAction<BackgroundType>>
}
const dropzoneClass = (isDragAccept : boolean, isDragReject : boolean) => {
    if(isDragAccept) return "accept";
    if(isDragReject) return "reject";
}
const Settings = ({isOpen, closeModal, background, setBackground}: props) => {
    const theme = useContext(ThemeContext);

    const [files, setFiles] = useState<BackgroundType[]>(getBackgrounds());
    const [isLoading, setIsLoading] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const {
        getRootProps, 
        getInputProps, 
        isDragActive, 
        isDragAccept, 
        isDragReject,
        acceptedFiles
    } = useDropzone(
        {
            noClick: true,
            accept: acceptedFilesFormats,
            maxSize: MAX_FILE_SIZE * 1000000
        }
    );
    const sendForm = (e: FormEvent)=>{
        e.preventDefault();
        if(acceptedFiles.length === 0){
            return setErrorMessage("Escolha uma imagem ou video para ser seu plano de fundo.");
        }
        setErrorMessage("");
        setIsLoading(true);
        saveFiles(acceptedFiles)
        .then(()=>{
            setFiles(getBackgrounds());
        })
        .catch((error)=>{
            setErrorMessage(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }
    return(
        <Modal isOpen={isOpen} style={ModalStyle(theme.transparent)} ariaHideApp={false}>
            <M.Header>
                <M.Title>Personalizar</M.Title>
                <IoClose onClick={()=> closeModal()} className="close-modal"/>
            </M.Header>
            <C.Title>Planos de fundo</C.Title>
            <C.FileList>
                {
                    files.map((file)=>(
                        <C.File 
                            key={file.path} 
                            className={background.path === file.path ? "selected" : ""}
                        >
                            <p>{file.name}</p>
                            <button onClick={()=> setBackground(file)}>Selecionar</button>
                        </C.File>
                    ))
                }
            </C.FileList>
            <C.Form onSubmit={(e)=> sendForm(e)}>
                <C.Title>Adicionar</C.Title>
                <C.Dropzone {...getRootProps({className: dropzoneClass(isDragAccept, isDragReject)})}>
                    <input {...getInputProps()} />
                    {
                        isDragAccept &&
                        <C.DropzoneText>
                            <AiOutlineFileAdd />
                            <p>Solte os arquivos aqui...</p>
                        </C.DropzoneText> 
                    }
                    {
                        isDragReject &&
                        <C.DropzoneText>
                            <AiOutlineFileExcel />
                            <p>Esse tipo de arquivo não é compatível...</p>
                        </C.DropzoneText>
                    }
                    {
                        acceptedFiles.length === 0 && !isDragActive &&
                        <C.DropzoneText>
                            <AiOutlineFile />
                            <p>
                                Arraste e solte os arquivos aqui... <br />
                                (Tamanho maximo de 10MB)
                            </p>
                        </C.DropzoneText>
                    }
                    {
                        acceptedFiles.length > 0 &&
                        <C.DropzoneText>
                            {acceptedFiles.map(file=> <p key={file.path}>{file.name}</p>)}
                        </C.DropzoneText>
                    }
                </C.Dropzone> 
                {/* MESSAGES */}
                {
                    errorMessage &&
                    <C.ErrorMessage>{errorMessage}</C.ErrorMessage>
                }
                {
                    isLoading &&
                    <C.LoadingMessage>Carregando...</C.LoadingMessage>
                }
                {/* END MESSAGES */}
                <SendButton value="Adicionar"/>
            </C.Form>
        </Modal>
    )
}
export default Settings;