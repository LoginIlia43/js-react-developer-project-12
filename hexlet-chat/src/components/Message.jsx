import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

const Message = (props) => {
  const { id } = props;
  const currentMessage = useSelector((state) => state.messages.entities[id]);
  const { message, username } = currentMessage;
  return (
    <div key={id} className="d-flex gap-2">
      <b>{`${username}:`}</b>
      <p className="text-break">{filter.clean(message)}</p>
    </div>
  );
};

export default Message;
