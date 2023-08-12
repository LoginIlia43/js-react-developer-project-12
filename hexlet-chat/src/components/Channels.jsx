import { useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Channel from './Channel';

const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels.entities));

  return (
    <ButtonGroup vertical className="w-100">
      {channels.map(({ id }) => (
        <Channel key={id} id={id} />
      ))}
    </ButtonGroup>
  );
};

export default Channels;
