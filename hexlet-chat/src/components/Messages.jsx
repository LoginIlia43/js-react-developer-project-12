import Message from "./Message";

function Messages(props) {
    const { messages, id } = props;

    return (
        <div id="messages-container" className="overflow-y-scroll h-100 py-3">
            <ul>
                {messages.map((msg) => <Message /> )}
            </ul>
        </div>
    )
}

export default Messages;
