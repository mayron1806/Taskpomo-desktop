import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 20px;
    overflow: hidden;
    background-color: ${props => props.theme.transparent};
    border: 2px solid var(--purple);
`;
export const Button = styled.button`
    background-color: transparent;
    cursor: pointer;
    height: 100%;
    transition: 0.5s;
    svg{
        font-size: 3rem;
        color: var(--white);
    }
    &.active{
        background-color: var(--purple);
    }
`;
    