import { createContext, memo, useState } from "react";
import { useLocalState } from "../../hooks/useLocalState";

import Title from "../Title";
import Timer from "../Timer";

import * as C from "./style";

import {IoSettingsOutline} from "react-icons/io5"
import PomodoroSettings from "../Modal/PomodoroSettings";

const MINUTES_MULTIPLY = 60;

const DEFAULT_WORK_TIME = 25 * MINUTES_MULTIPLY;
const DEFAULT_BREAK_TIME = 5 * MINUTES_MULTIPLY;

type PomodoroContextProps = {
    workTime: { value: number, setValue: (newValue: number) => void },
    breakTime: { value: number, setValue: (newValue: number) => void},
    canPlayAudio: {value: boolean, setValue: (newValue: boolean) => void }
}
export const PomodoroContext = createContext<PomodoroContextProps>({
    workTime: { value: DEFAULT_WORK_TIME, setValue: ()=>{} },
    breakTime: { value: DEFAULT_BREAK_TIME, setValue: ()=>{} },
    canPlayAudio: {value: true, setValue: () => {}}
});

const Pomodoro = memo(() => {
    // times
    const {
        state: workTime,
        setState: setWorkTime
    } = useLocalState<number>("work-time", DEFAULT_WORK_TIME);
    const {
        state: breakTime, 
        setState: setBreakTime
    } = useLocalState<number>("break-time", DEFAULT_BREAK_TIME);

    // audio
    const {
        state: canPlayAudio, 
        setState: setCanPlayAudio
    } = useLocalState<boolean>("audio", true);

    // settings
    const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
    const openSettings = () => setSettingsIsOpen(true);
    const closeSettings = () => setSettingsIsOpen(false);

    return(
        <div>
            <PomodoroContext.Provider value={{
                workTime: { value: workTime, setValue: setWorkTime },
                breakTime: { value: breakTime, setValue: setBreakTime },
                canPlayAudio: { value: canPlayAudio, setValue: setCanPlayAudio }
            }}>
                <C.Header>
                    <Title title="Pomodoro"/>
                    <IoSettingsOutline className="settings" size={25} onClick={()=> openSettings()}/>
                </C.Header>
                <C.TimerContainer>
                    <Timer />
                </C.TimerContainer>
                <PomodoroSettings isOpen={settingsIsOpen} closeModal={closeSettings}/>
            </PomodoroContext.Provider>
        </div>
    )
})
export default Pomodoro;