import ToggleButton from 'react-bootstrap/ToggleButton';
import { useSelector } from 'react-redux';

function Channel(props) {
    const { channelName, id } = props;
    const { currentChannelId } = useSelector((state) => state.currentChannelId);
    const isActiveChannel = id === currentChannelId;
    

    return (
        <ToggleButton
            type="radio"
            variant="outline-secondary"
            id={id}
            className='btn w-100 border-0 rounded-0'
            checked={isActiveChannel}
        >
            {channelName}
        </ToggleButton>
    );
}

export default Channel;
