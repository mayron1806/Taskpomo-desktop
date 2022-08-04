import { useEffect, useState } from "react";
import { useLocalState } from "../../hooks/useLocalState";

import { getRandomItem } from "../../utils/Random";

import * as C from "./style";

import Title from "../Title";

import messages from "../../services/dailyMessages.json";
import monthName from "../../services/month.json";

type DailyMessageType = { author: string, message: string }

const getRandomMessage = () : DailyMessageType => {
    const message = getRandomItem<DailyMessageType>(messages);
    return { author: message.author, message: message.message}
}
const getTitle = () : string => {
    const dateRef = new Date();
    let day = dateRef.getDate();
    let year = dateRef.getFullYear(); 

    // saudação 
    let salutation;
    if(dateRef.getHours() >= 19) salutation = "Boa noite";
    if(dateRef.getHours() >= 12) salutation = "Boa tarde";
    if(dateRef.getHours() < 12) salutation = "Bom dia";
    //mes
    let mounth = monthName[dateRef.getMonth()];
    return `${salutation}, hoje é dia ${day} de ${mounth} de ${year}.`;
}

const Wellcome = () => {
    // TITULO ---------------------------------------------------------------------------------
    const [titleMessage, setTitleMessage] = useState<string>("");
    const [dailyMessage, setDailyMessage] = useState<DailyMessageType>();

    useEffect(()=>{
        setTitleMessage(getTitle());
        setDailyMessage(getRandomMessage());

        // atualiza o titulo a cada hora
        setInterval(() => setTitleMessage(getTitle()), (1000 * 60));
    }, [])

    return(
        <>
            <Title title={titleMessage} align="center"/>
            <C.MessageContainer>
                <C.Message>"{dailyMessage?.message}"</C.Message>
                <C.Author>{dailyMessage?.author}</C.Author>
            </C.MessageContainer>
        </>
    )
}
export default Wellcome;