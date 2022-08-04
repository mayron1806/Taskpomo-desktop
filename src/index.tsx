import ReactDOM from "react-dom";
import { App } from "./App";
import Global from "./styles/Global";

ReactDOM.render(
  (
    <>
      <Global/>
      <App />
    </>
  ), 
  document.getElementById("root")
);
