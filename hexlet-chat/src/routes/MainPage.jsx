import React, { useContext, useEffect } from "react";
import AuthContext from "../components/AuthContext";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Channels from "../components/Channels";
import Messages from "../components/Messages";
import MessageForm from "../components/MessageForm";

function MainPage(props) {
    const { fetchData } = props;
    const { isAuthorized } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login");
        } else {
            fetchData();
        };
    }, [fetchData, isAuthorized, navigate]);

    const { channels } = useSelector((state) => state.channels);
    const { messages } = useSelector((state) => state.messages);
    const { currentChannelId } = useSelector((state) => state.currentChannelId);
    const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="navbar border px-5">
                <a href="/" className="navbar-brand">Chat</a>
                <Button className="btn navbar-bth">Выйти</Button>
            </div>
            <div className="container border h-100 my-4 overflow-hidden">
                <div className="row h-100">
                    <div id="channels-container" className="col-4 h-100 border-end py-3">
                        <p className="text-center">Каналы</p>
                        <Channels channels={channels} />
                    </div>
                    <div id="chat-container" className="col h-100 py-3">
                        <div className="d-flex flex-column h-100">
                            <p className="text-center">Чат канала</p>
                            <Messages messages={currentChannelMessages} />
                            <MessageForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default MainPage;
