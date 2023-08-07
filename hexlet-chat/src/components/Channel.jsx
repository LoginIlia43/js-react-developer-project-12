import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { useSelector } from "react-redux";
import { actions as channelIdActions } from "../slices/channelIdSlice";
import { useDispatch } from "react-redux";

import { actions as modalActions } from "../slices/modalSlice";

function Channel(props) {
    const { id } = props;
    const { name, removable } = useSelector((state) => state.channels.entities[id]);

    const { currentChannelId } = useSelector((state) => state.currentChannelId);
    const isActiveChannel = id === currentChannelId;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(channelIdActions.setCurrentChannelId(id));
    };

    const handleRename = () => {
        dispatch(modalActions.toggleIsShow());
        dispatch(modalActions.setType("renameChannel"));
        dispatch(modalActions.setId(id));
    };

    const handleRemove = () => {
        dispatch(modalActions.toggleIsShow());
        dispatch(modalActions.setType("removeChannel"));
        dispatch(modalActions.setId(id));

    };

    return (
        <ButtonGroup id={id}>
            <ToggleButton
                type="radio"
                variant="outline-secondary"
                className='btn w-100 border-0 rounded-0 text-break'
                checked={isActiveChannel}
                onClick={handleClick}
            >
                # {name}
            </ToggleButton>
            {removable ?
                <DropdownButton 
                    as={ButtonGroup}
                    size="sm"
                    title=""
                    variant={isActiveChannel ? "secondary rounded-0" : "shadow rounded-0"}>
                    <Dropdown.Item
                        onClick={handleRemove}
                    >
                        Удалить
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={handleRename}
                    >
                        Переименовать
                    </Dropdown.Item>
                </DropdownButton> : null}

        </ButtonGroup>
    );
}

export default Channel;
