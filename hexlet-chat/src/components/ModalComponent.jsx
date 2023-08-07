import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";

import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form"

import { actions as modalActions } from "../slices/modalSlice";

function ModalComponent() {
    const modalType = useSelector(state => state.modal.type);
    const isShow = useSelector(state => state.modal.isShow);
    const dispatch = useDispatch();

    const handleClose = () => dispatch(modalActions.toggleIsShow());

    const titles = {
        addChannel: "Добавить канал",
        renameChannel: "Переименовать канал",
        removeChannel: "Удалить канал",
    };

    const dispatchModalChildren = {
        addChannel: <ModalAddChannel handleClose={handleClose} />,
        renameChannel: <ModalRenameChannel handleClose={handleClose} />,
        removeChannel: <ModalRemoveChannel handleClose={handleClose} />,
    };

    return (
        <Modal show={isShow} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{titles[modalType]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dispatchModalChildren[modalType]}
            </Modal.Body>
        </Modal>
    )
}

function ModalAddChannel(props) {
    const [error, setError] = useState(null);

    const { handleClose } = props;
    const channels = Object
        .values(useSelector(state => state.channels.entities))
        .map(({ name }) => name);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { name } = Object.fromEntries(formData.entries());
        const isNameExist = Boolean(channels.includes(name));
        if (isNameExist) {
            setError("Такое имя уже существует!");
        } else {
            setError(null);
            socket.emit("newChannel", ({ "name": name, "author": localStorage.getItem("username") }));
            handleClose();
        }
    };

    return (
        <>
        <Form id="channel-add-form" onSubmit={handleSubmit}>
            <Form.Control
                className="w-100 px-2 py-1 border rounded-3"
                type="text"
                placeholder="Введите название канала..."
                name="name"
                />
            {error ? <div className="text-danger pt-3">{error}</div> : null }
            <div className="d-flex gap-2 justify-content-end mt-3">
                <Button variant="secondary" onClick={handleClose}>Отменить</Button>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Подтвердить
                </Button>
            </div>
        </Form>
        </>
    )
}

function ModalRenameChannel(props) {
    const [error, setError] = useState(null);

    const { handleClose } = props;
    const id = useSelector(state => state.modal.channelId);
    const channels = Object
        .values(useSelector(state => state.channels.entities))
        .map(({ name }) => name);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { name } = Object.fromEntries(formData.entries());
        const isNameExist = Boolean(channels.includes(name));
        if (isNameExist) {
            setError("Такое имя уже существует!");
        } else {
            setError(null);
            socket.emit("renameChannel", ({ "id": id, "name": name }));
            handleClose();
        }
    };

    return (
        <>
        <Form id="channel-rename-form" onSubmit={handleSubmit}>
            <Form.Control
                className="w-100 px-2 py-1 border rounded-3"
                type="text"
                placeholder="Введите название канала..."
                name="name"
                />
            {error ? <div className="text-danger pt-3">{error}</div> : null }
            <div className="d-flex gap-2 justify-content-end mt-3">
                <Button variant="secondary" onClick={handleClose}>Отменить</Button>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Подтвердить
                </Button>
            </div>
        </Form>
        </>
    )
}
function ModalRemoveChannel(props) {
    const { handleClose } = props;

    const id = useSelector(state => state.modal.channelId);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("removeChannel", { "id": id });
        handleClose();
    }

    return (
        <>
        <form id="channel-delete-form" onSubmit={handleSubmit}>
            <div className="d-flex gap-2 justify-content-end mt-3">
                <Button variant="secondary" onClick={handleClose}>Отменить</Button>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Подтвердить
                </Button>
            </div>
        </form>
        </>
    )
}
export default ModalComponent;
