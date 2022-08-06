import styled, { css } from "styled-components";

export const Title = styled.h3`
    font-size: 2rem;
    color: var(--white);
    font-weight: 500;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 2rem;
`;  
export const File = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    border-bottom: 1px solid var(--gray);
    padding-bottom: 0.5rem;
    p{
        color: ${props => props.theme.text_color};
        font-size: 1.8rem;
    }
    button{
        padding: 0.5rem 1rem;
        border-radius: 5px;
        background-color: var(--gray);
        color: var(--white);
        cursor: pointer;
        :hover{
            background-color: purple;
        }
    }
`;
export const Dropzone = styled.div`
    background-color: ${props => props.theme.transparent};
    padding: 20px;
    color: ${props => props.theme.text_color};
    outline: none;
    border: 2px solid ${props => props.theme.transparent};
    border-radius: 10px;
    &.accept{
        border: 2px solid var(--green);
        color: var(--green);
    }
    &.reject{
        border: 2px solid var(--red);
        color: var(--red);
    }
`;
export const DropzoneText = styled.div`
    display: flex;
    font-size: 1.8rem;
    flex-direction: column;
    align-items: center;
    text-align: center;
    svg{
        font-size: 2.5rem;
    }
`;
const text = styled.p`
    font-size: 2rem;
`;
export const ErrorMessage = styled(text)`
    color: var(--red);
`;
export const LoadingMessage = styled(text)`
    color: var(--yellow);
`;