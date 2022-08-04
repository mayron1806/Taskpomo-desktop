import styled from "styled-components";
export const Background = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
    video{
        min-width: 100%;
        min-height: 100%;
    }
`;
export const Main = styled.main`
    min-height: 100vh;
    display: flex;
    justify-content: center;
`;
export const Content = styled.div`
    padding: 2rem;
    display: grid;
    height: 100%;
    max-width: 1000px;
    grid-template-columns: auto 50px;
    grid-template-rows: minmax(200px, 20vh, 35vh) 1fr 1fr;
    grid-template-areas: 
    "wellcome theme"
    "pomodoro pomodoro"
    "tasks tasks";
    grid-gap: 5rem; 
    transition: 0.5s;
    .tasks{
        grid-area: tasks;
    }
    .wellcome{
        grid-area: wellcome;
    }
    .theme{
        grid-area: theme;
    }
    .pomodoro{
        grid-area: pomodoro;
    }
   
    @media (max-width: 600px){
        grid-template-columns: 1fr;
        grid-template-rows: 30vh auto 1fr 1fr;
        grid-template-areas: 
        "wellcome"
        "theme"
        "pomodoro"
        "tasks";
    }
`;