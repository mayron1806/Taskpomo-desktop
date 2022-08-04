import styled from "styled-components";
import Modal from "react-modal";
export const ModalContainer = styled(Modal)`
    background-color: ${props => props.theme.text_color};
`;
export const Form = styled.form`
    max-width: 500px;
`;
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close-modal{
        color: ${props => props.theme.text_color};
        cursor: pointer;
        font-size: 3rem;
    }
`;
export const Title = styled.h2`
    font-size: 2.5rem;
    color: var(--purple);
    font-weight: 500;
`;
export const TimeBlock = styled.div`
    margin-bottom: 1rem;
    text-align: center;
`;
export const Audio = styled.div`
    width: 100%;
    height: 50px;
    border-radius: 2px;
    cursor: pointer;
    .icon{
        width: 100%;
        height: 100%;
        color: var(--purple);
    }
`;