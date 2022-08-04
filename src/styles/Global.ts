import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        border: 0;
        text-decoration: none;
        box-sizing: border-box;
        outline: none;
    }
    html{
        //cores
        --gray: #B4B4B4;
        --white: #F5F5F5;
        --green: #1EF526;
        --yellow: #E9E01B;
        --red: #FA0A0A;
        --black: #5A5A5A;
        --purple: #9C44DC;
        --light-purple: #BC8AE1;
        --shadow: rgba(0, 0, 0, 0.3);

        --error: #FA0A0A;
        --warning: #FFB818;
        
        font-size: 62.5%;
        @media (max-width: 1200px){
            font-size: 55%;
        }
    }
    body{
        font-size: 1rem;
        font-family: 'Roboto Mono', monospace;
        overflow: auto;
        ::-webkit-scrollbar{
            width: 10px;
        }
        ::-webkit-scrollbar-track{
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            box-shadow: inset 0 0 5px var(--black);
        }
        ::-webkit-scrollbar-thumb{
            background-color: var(--gray);
            border-radius: 5px;
        }
    }
`;
export default Global;