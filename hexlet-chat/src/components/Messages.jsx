import Message from "./Message";

function Messages(props) {
    const { messages } = props;

    return (
        <div id="messages-container" className="h-100 overflow-auto my-3">
            {messages.map(({ message, id, username }) => <Message key={id} id={id} text={message} username={username} /> )}
        </div>
    )
}

export default Messages;
