import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import * as C from "./style";
import * as M from "../style";
import { ModalStyle } from "../../../styles/ModalStyle";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
type props = {
	isOpen: boolean,
	closeModal: () => void,
	title: string,
	content?: string
}
const ShowTask = ({isOpen, closeModal, title, content} : props) => {
	const theme = useContext(ThemeContext);
	return(
		<Modal isOpen={isOpen} style={ModalStyle(theme.transparent)}>
			<M.Header>
				<M.Title>{title}</M.Title>
				<IoClose onClick={()=> closeModal()} className="close-modal"/>
			</M.Header>
			{
				content !== undefined &&
				<C.Content>{content}</C.Content>
			}
		</Modal>
	)
}
export default ShowTask;