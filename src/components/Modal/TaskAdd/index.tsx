import { useState, useRef, useEffect, FormEvent, useContext } from "react";
import { TaskItemType } from "../../../types/taskItemType";
import ErrorMessage from "../../ErrorMessage";
import Label from "../../Label";
import SendButton from "../../SendButton";
import { v4 as getID } from "uuid";
import { Priority as p } from "../../../enum/priority";
import * as M from "../style";
import * as C from "./style";
import Modal from "react-modal";
import { ModalStyle } from "../../../styles/ModalStyle";
import { ThemeContext } from "styled-components";
import { IoClose } from "react-icons/io5";

type props = {
  isOpen: boolean,
  closeModal: () => void,
  addTask: (new_task: TaskItemType) => void
}

const TaskAdd = ({isOpen, closeModal, addTask}: props) => {  
    const theme = useContext(ThemeContext);

    const [name, setName] = useState<string>("");
    const [priority, setPriority] = useState<p>(p.LOW);
    const [description, setDescription] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const nameInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
        if(name.length > 0){
            nameInputRef.current?.classList.remove("error");
            nameInputRef.current?.focus();
            setErrorMessage("");
        }
    }, [name])

    const resetForm = () => {
        setName("");
        setPriority(p.LOW);
        setDescription("");
        setErrorMessage("");
    }
    
    const sendForm = (e: FormEvent) => {
        e.preventDefault();
        // se foi digitado um nome adiciona a tarefa
        if(name.length > 0){
            nameInputRef.current?.classList.remove("error");
            const task: TaskItemType = {
                id: getID(),
                complete: false,
                name: name,
                priority: priority,
                description: description
            }
            addTask(task);
            resetForm();
            closeModal();
            return;
        }
        nameInputRef.current?.classList.add("error");
        setErrorMessage("Você precisa peencher o campo nome.");
    }
    return(
      <Modal isOpen={isOpen} style={ModalStyle(theme.transparent)} ariaHideApp={false}>
        <M.Form onSubmit={(e) => sendForm(e)}>
            <M.Header>
                <M.Title>Adicionar tarefa</M.Title>
                <IoClose onClick={()=> closeModal()} className="close-modal"/>
            </M.Header>
            <Label htmlFor="name">Nome da tarefa</Label>
            <C.Input
                ref={nameInputRef} 
                name="name"
                placeholder="Ex: Estudar Matemática"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <C.PriorityContainer>
                <Label className="inline" htmlFor="priority">Prioridade:</Label>
                <C.Select 
                    name="priority" 
                    onChange={e => setPriority(parseInt(e.target.value))}
                    value={priority}
                >
                    <option value={p.LOW}>Baixa</option>
                    <option value={p.MEDIUM}>Média</option>
                    <option value={p.HIGH}>Alta</option>
                </C.Select>
            </C.PriorityContainer>
            <Label htmlFor="description">Descrição</Label>
            <C.Text 
                maxLength={500} 
                rows={4} 
                name="description" 
                placeholder="Aprofundar em trigonometria..."
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SendButton value="Criar"/>
        </M.Form>
      </Modal>
    )
}
export default TaskAdd;