import Channel from "./Channel";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Channels(props) {
    const { channels } = props;

    return (
        <ButtonGroup vertical className="w-100">
            {channels.map(({ name, id }) => <Channel key={id} channelName={name} id={id} />)}
        </ButtonGroup>
    )
}

export default Channels;