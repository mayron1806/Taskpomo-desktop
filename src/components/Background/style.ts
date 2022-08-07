import styled from "styled-components";

export const Background = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
    video, img, div.no-background{
        min-width: 100%;
        min-height: 100%;
    }
    div.no-background{
        background-color: ${props => props.theme.main};
    }
`;