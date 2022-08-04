import styled from "styled-components";

export const Form = styled.form`
    max-width: 500px;
    label{
        color: var(--white);
    }
`;
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close-modal{
        color: var(--white);
        cursor: pointer;
        font-size: 3rem;
    }
`;
export const Title = styled.h2`
    font-size: 2.5rem;
    color: var(--purple);
    font-weight: 500;
`;