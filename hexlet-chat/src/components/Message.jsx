import { useSelector } from "react-redux";

function Message(props) {
    const { id } = props;
    const currentMessage = useSelector((state) => state.messages.entities[id]);
    const { message, username } = currentMessage;
    return (
        <div key={id} className="d-flex gap-2">
            <b>{username}:</b>
            <p className="text-break">{message}</p>
        </div>
    )
}

export default Message;
