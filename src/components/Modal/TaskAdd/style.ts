import styled, { keyframes } from "styled-components";

/* ANIMATION -----------------------------------------------------------------------------------*/
const vibrateAnim = keyframes`
    0%, 20%{
        transform: translateX(0);
    }
    10%, 30%{
        transform: translateX(10px);
    }
    40%, 60%{
        transform: translateX(15px);
    }
    50%, 70%{
        transform: translateX(5px);
    }
    80%, 100%{
        transform: translateX(10px);
    }
    90%{
        transform: translateX(0px);
    }
`;

/* COMPONENTS --------------------------------------------------------------------------------- */
export const Input = styled.input.attrs({type:"text"})`
    font-size:1.8rem;
    height:100%;
    padding:1rem;
    width: 100%;
    background-color: ${props=> props.theme.transparent};
    color: ${props=> props.theme.text_color};
    border: 1px solid var(--purple);
    border-radius: 10px;
    &.error{
        border-color: var(--red);
        box-shadow: 2px 2px 5px transparent;
        animation:${vibrateAnim} 0.3s linear 1;
    }
`;
export const Text = styled.textarea`
    font-size:1.8rem;
    height:100%;
    padding:1rem;
    width: 100%;
    background-color: ${props=> props.theme.transparent};
    color: ${props=> props.theme.text_color};
    border: 1px solid var(--purple);
    border-radius: 10px;
`;
export const PriorityContainer = styled.div` margin-top: 2rem; `;
export const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid var(--purple);
    border-radius: 10px;
    font-size: 1.8rem;
    background-color: ${props=> props.theme.transparent};
    color: ${props=> props.theme.text_color};
`;