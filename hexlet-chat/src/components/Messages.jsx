import { useSelector } from "react-redux";
import Message from "./Message";

function Messages(props) {
    const { messages } = props;
    return (
        <div id="messages-container" className="h-100 overflow-auto my-3">
            {messages.map(({ id }) => <Message key={id} id={id} /> )}
        </div>
    )
}

export default Messages;
