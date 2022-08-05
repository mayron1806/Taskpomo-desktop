import { ThemeProvider } from 'styled-components';
import Container from './components/Container';
import Pomodoro from './components/Pomodoro';
import TaskList from './components/TaskList';
import ThemeController from './components/ThemeController';
import Wellcome from './components/Wellcome';
import * as C from "./app.style";
import { useLocalState } from './hooks/useLocalState';
import { useEffect, useState } from 'react';
import lightTheme from './themes/light';
import Theme from './types/Theme';
import { canNotify, getNotificationPermision } from './utils/Notification';
import video from "./assets/background/bg.mp4";
import Settings from './components/Modal/Settings';
import { IoImagesOutline } from 'react-icons/io5';
import Background from './types/Background';

export function App() {
    const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);
    const openSettings = () => setSettingsIsOpen(true);
    const closeSettings = () => setSettingsIsOpen(false);
    const {
        state: currentTheme,
        setState: setCurrentTheme
    } = useLocalState<Theme>("theme", lightTheme);
    const {
        state: currentBackground,
        setState: setCurrentBackground
    } = useLocalState<Background>("background", {} as Background);
    // se nao pode enviar noficação vai pedir permissão quando renderizar o app
    useEffect(()=>{ !canNotify() && getNotificationPermision()}, []);
    return (
        <>
            <ThemeProvider theme={currentTheme.colors}>
                <C.Background>
                    {
                        currentBackground.type === "video" &&
                        <video autoPlay loop>
                            <source src={currentBackground.path}/>
                        </video>
                        || 
                        currentBackground.type === "image" &&
                        <img src={currentBackground.path} alt="imagem de fundo" />
                        ||
                        <div className='default-background'></div>
                    }

                    
                    
                </C.Background>
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
                <Settings isOpen={settingsIsOpen} closeModal={closeSettings}/>
                {/* END MODALS */}
            </ThemeProvider>
        </>
    )
}