import { useEffect } from 'react';
import Message from './Message';

const Messages = (props) => {
  const { messages } = props;

  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    const sH = messagesContainer.scrollHeight;
    messagesContainer.scrollTo(0, sH);
  }, [messages]);

  return (
    <div id="messages-container" className="h-100 w-100 overflow-auto my-3">
      {messages.map(({ id }) => (
        <Message key={id} id={id} />
      ))}
    </div>
  );
}

export default Messages;
