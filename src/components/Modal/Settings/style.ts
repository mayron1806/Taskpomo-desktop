import styled from "styled-components";

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

`;  
export const File = styled.div`
    font-size: 1.8rem;
    color: ${props => props.theme.text_color};
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
