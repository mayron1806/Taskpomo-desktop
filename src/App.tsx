import { ThemeProvider } from 'styled-components';
import Container from './components/Container';
import Pomodoro from './components/Pomodoro';
import TaskList from './components/TaskList';
import ThemeController from './components/ThemeController';
import Wellcome from './components/Wellcome';
import * as C from "./app.style";
import { useLocalState } from './hooks/useLocalState';
import { useEffect, useState } from 'react';
import ThemeType from './types/Theme';
import { canNotify, getNotificationPermision } from './utils/Notification';
import Settings from './components/Modal/Settings';
import { IoImagesOutline } from 'react-icons/io5';
import BackgroundType from './types/Background';
import Background from './components/Background';
import darkTheme from './themes/dark';
import { getBackgrounds } from './services/File';


export function App() {
    const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
    const openSettings = () => setSettingsIsOpen(true);
    const closeSettings = () => setSettingsIsOpen(false);
    
    const {
        state: currentTheme,
        setState: setCurrentTheme
    } = useLocalState<ThemeType>("theme", darkTheme);
    
    const {
        state: currentBackground,
        setState: setCurrentBackground
    } = useLocalState<BackgroundType>("background", getBackgrounds()[0]);
   
    // se nao pode enviar noficação vai pedir permissão quando renderizar o app
    useEffect(()=>{ !canNotify() && getNotificationPermision()}, []);
    return (
        <>
            <ThemeProvider theme={currentTheme.colors}>
                <Background background={currentBackground} />
                <C.Main>
                    <C.Content>
                        <Container className='wellcome'>
                            <Wellcome />
                        </Container>
                        <ThemeController theme={currentTheme} setTheme={setCurrentTheme}/>
                        <Container className="pomodoro">
                            <Pomodoro />
                        </Container>
                        <Container  className="tasks">
                            <TaskList />
                        </Container>
                    </C.Content>
                </C.Main>
                <C.Settings onClick={()=> openSettings()}>
                    <IoImagesOutline />
                </C.Settings>
                {/* MODALS */}
                <Settings 
                    isOpen={settingsIsOpen} 
                    closeModal={closeSettings} 
                    setBackground={setCurrentBackground}
                    background={currentBackground}
                />
                {/* END MODALS */}
            </ThemeProvider>
        </>
    )
}