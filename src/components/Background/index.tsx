import BackgroundType from "../../types/Background";
import * as C from "./style";
type props = {
    background: BackgroundType
}
const Background = ({ background } : props) => {
    return(
        <C.Background>
            {
                background && background.type === "video" &&
                    <video autoPlay loop src={background.path}></video>
                || 
                background && background.type === "image" &&
                    <img src={background.path} alt="imagem de fundo" />
                ||
                    <div className='no-background'></div>
            }
        </C.Background>
    )
}
export default Background;