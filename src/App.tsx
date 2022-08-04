import { ThemeProvider } from 'styled-components';
import Container from './components/Container';
import Pomodoro from './components/Pomodoro';
import TaskList from './components/TaskList';
import ThemeController from './components/ThemeController';
import Wellcome from './components/Wellcome';
import * as C from "./app.style";
import { useLocalState } from './hooks/useLocalState';
import { useEffect } from 'react';
import lightTheme from './themes/light';
import Theme from './types/Theme';
import { canNotify, getNotificationPermision } from './utils/Notification';
import video from "./assets/background/bg.mp4";

export function App() {
  const {
    state: currentTheme,
    setState: setCurrentTheme
  } = useLocalState<Theme>("theme", lightTheme);
  // se nao pode enviar noficação vai pedir permissão quando renderizar o app
  useEffect(()=>{ !canNotify() && getNotificationPermision()}, []);
  return (
    <>
      <ThemeProvider theme={currentTheme.colors}>
        <C.Background>
            <video autoPlay loop>
                <source src={video}/>
            </video>
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
      </ThemeProvider>
    </>
  )
}