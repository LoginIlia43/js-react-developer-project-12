import ToggleButton from 'react-bootstrap/ToggleButton';
import { useSelector } from 'react-redux';
import { actions as channelIdActions } from '../slices/channelIdSlice';
import { useDispatch } from 'react-redux';

function Channel(props) {
    const { id } = props;
    const { name, removable } = useSelector((state) => state.channels.entities[id]);

    const { currentChannelId } = useSelector((state) => state.currentChannelId);
    const isActiveChannel = id === currentChannelId;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(channelIdActions.setCurrentChannelId(id));
    };

    return (
        <ToggleButton
            type="radio"
            variant="outline-secondary"
            id={id}
            className='btn w-100 border-0 rounded-0'
            checked={isActiveChannel}
            onClick={handleClick}
        >
            # {name}
        </ToggleButton>
    );
}

export default Channel;
