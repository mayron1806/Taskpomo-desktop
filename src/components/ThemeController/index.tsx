import darkTheme from "../../themes/dark";
import lightTheme from "../../themes/light";
import ThemeType from "../../types/Theme";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"

import * as C from "./style";

type props = { theme: ThemeType, setTheme: (theme :ThemeType) => void }
const ThemeController = ({ theme, setTheme }: props) => {
    return(
        <C.Container className="theme">
            <C.Button 
                className={theme.name === "light" ? "active" : ""}
                onClick={()=> setTheme(lightTheme)}
            ><MdOutlineLightMode /></C.Button>
            <C.Button
                onClick={()=> setTheme(darkTheme)}
                className={theme.name === "dark" ? "active" : ""}
            ><MdOutlineDarkMode /></C.Button>
        </C.Container>
    )
}
export default ThemeController;