function Message(props) {
    const { text, id, username } = props;
    return (
        <div key={id} className="d-flex gap-2">
            <b>{username}:</b>
            <p>{text}</p>
        </div>
    )
}

export default Message;
