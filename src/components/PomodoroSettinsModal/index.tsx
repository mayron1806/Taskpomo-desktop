import { useContext, useState, useRef, FormEvent, useEffect } from "react";
import { GoUnmute, GoMute } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { MIN_BREAK_TIME, MIN_WORK_TIME } from "../../config/MinTimes";
import { ModalStyle } from "../../styles/ModalStyle";
import { getMinutes } from "../../utils/TimeFormat";
import ErrorMessage, { ErrorType } from "../ErrorMessage";
import Label from "../Label";
import { PomodoroContext } from "../Pomodoro";
import SendButton from "../SendButton";
import TimeInput from "../TimeInput";
import * as C from "./style";

type props = {
  isOpen: boolean,
  closeModal: ()=> void
}
const PomodoroSettingsModal = ({isOpen, closeModal} : props) => {
    const pomodoro = useContext(PomodoroContext);

    const [settingsWorkTime, setSettingsWorkTime] = useState<number>(pomodoro.workTime.value);
    const [settingsBreakTime, setSettingsBreakTime] = useState<number>(pomodoro.breakTime.value);
    const [settingsCanPlayAudio, setSettingsCanPlayAudio] = useState<boolean>(pomodoro.canPlayAudio.value);

    const workTimeInputRef = useRef<HTMLDivElement | null>(null);
    const breakTimeInputRef = useRef<HTMLDivElement | null>(null);

    const [error, setError] = useState<{message?: string, type?: ErrorType}>({});

    const saveTimes = (e: FormEvent) => {
        e.preventDefault();
        // valida os dados  
        if(getMinutes(settingsWorkTime) < MIN_WORK_TIME){
            const message = `O tempo de trabalho precisa ser de no minimo ${MIN_WORK_TIME} minutos`;
            setError({type: ErrorType.ERROR, message: message});
            workTimeInputRef.current?.classList.add("error");
            return;
        }
        if(getMinutes(settingsBreakTime) < MIN_BREAK_TIME){
            const message = `O tempo de descanso precisa ser de no minimo ${MIN_BREAK_TIME} minutos`;
            setError({type: ErrorType.ERROR, message: message});
            breakTimeInputRef.current?.classList.add("error");
            return;
        }
        pomodoro.workTime.setValue(settingsWorkTime);
        pomodoro.breakTime.setValue(settingsBreakTime);
        pomodoro.canPlayAudio.setValue(settingsCanPlayAudio);
        close();
    }
    // remove a classe erro ao mudar o input, e limpa a mensagem de erro
    useEffect(()=>{
        if(settingsWorkTime > MIN_WORK_TIME){
            workTimeInputRef?.current?.classList.remove("error");
            setError({type: undefined, message: ""});
        }
        if(settingsBreakTime > MIN_BREAK_TIME){
            breakTimeInputRef?.current?.classList.remove("error");
            setError({type: undefined, message: ""});
        }
        // se o tempo de descanso for maior que a metade do tempo de trabalho
        if(getMinutes(settingsBreakTime) * 2 > getMinutes(settingsWorkTime)){
            const message = `É recomendado que o tempo de descanso tenha no maximo metado do tempo de trabalho.`
            setError({type: ErrorType.WARNING, message: message});
            breakTimeInputRef.current?.classList.add("warning");
            return;
        }
        if(getMinutes(settingsBreakTime) * 2 < getMinutes(settingsWorkTime)){
            setError({type: undefined, message: ""});
            breakTimeInputRef.current?.classList.remove("warning");
            return;
        }
    }, [settingsWorkTime, settingsBreakTime])
  return(
    <C.ModalContainer isOpen={isOpen}>
        <C.Form onSubmit={(e)=> saveTimes(e)}>
            <C.Header>
                <C.Title>Configurar</C.Title>
                <IoClose onClick={()=> closeModal()} className="close-modal"/>
            </C.Header>
            <C.TimeBlock>
                <Label htmlFor="work">Tempo de trabalho:(min)</Label>
                <TimeInput 
                    reference={workTimeInputRef}
                    id="work" 
                    onChange={setSettingsWorkTime} 
                    time={pomodoro.workTime.value} 
                />
            </C.TimeBlock>
            <C.TimeBlock>
                <Label htmlFor="break">Tempo de descanso:(min)</Label>
                <TimeInput 
                    reference={breakTimeInputRef}
                    id="break"
                    onChange={setSettingsBreakTime} 
                    time={pomodoro.breakTime.value} 
                />
            </C.TimeBlock>
            <C.TimeBlock>
                <Label htmlFor="audio">Ativar som:</Label>
                <C.Audio id="audio"onClick={() => setSettingsCanPlayAudio(!settingsCanPlayAudio)}>
                    {
                        settingsCanPlayAudio &&
                            <GoUnmute className="icon" size={25}/>
                        ||  
                            <GoMute className="icon" size={25}/>
                    }
                </C.Audio>
            </C.TimeBlock>
            {
                error.type !== undefined && error.message !== undefined &&
                <ErrorMessage type={error.type}>{error.message}</ErrorMessage>
            }
            <SendButton value="Salvar"/>
        </C.Form>
    </C.ModalContainer>
  )
}
export default PomodoroSettingsModal;