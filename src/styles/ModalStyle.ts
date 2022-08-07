export const ModalStyle = (backgroundColor: string) => {

  return{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      backdropFilter: "blur(5px)",
      transform: 'translate(-50%, -50%)',
      backgroundColor: backgroundColor,
      border: 0,
      height: "fit-content",
      borderRadius: "10px",
      minWidth: "400px"
    },
    overlay: {backgroundColor: "rgba(0,0,0,0.1)"}
  }
}