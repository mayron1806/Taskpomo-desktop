import Modal from "react-modal";
import * as C from "./style";
import * as M from "../style";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ThemeContext } from "styled-components";
import { ModalStyle } from "../../../styles/ModalStyle";
import { IoClose } from "react-icons/io5";
import {AiOutlineFile, AiOutlineFileAdd, AiOutlineFileExcel} from "react-icons/ai";
import SendButton from "../../SendButton";
import { acceptedFilesFormats, MAX_FILE_SIZE } from "../../../config/Files";
import { getFiles, saveFiles } from "../../../services/File";

type props ={
    isOpen: boolean,
    closeModal: () => void
}
const dropzoneClass = (isDragAccept : boolean, isDragReject : boolean) => {
    if(isDragAccept) return "accept";
    if(isDragReject) return "reject";
}
const Settings = ({isOpen, closeModal}: props) => {
    const theme = useContext(ThemeContext);
    const [files, setFiles] = useState<string[]>([]);
    useEffect(()=>{
        setFiles(getFiles());
    }, [])
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
        saveFiles(acceptedFiles);
    }
    return(
        <Modal isOpen={isOpen} style={ModalStyle(theme.transparent)}>
            <M.Header>
                <M.Title>Personalizar</M.Title>
                <IoClose onClick={()=> closeModal()} className="close-modal"/>
            </M.Header>
            <C.Title>Planos de fundo</C.Title>
            <C.FileList>
                {
                    files.map((file)=>(
                        <C.File>
                            <p>{file}</p>
                            <button></button>
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
                <SendButton value="Adicionar"/>
            </C.Form>
        </Modal>
    )
}
export default Settings;