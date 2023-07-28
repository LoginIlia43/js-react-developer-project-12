import React, { useContext, useEffect } from "react";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actions as commentsActions } from "../slices/channelsSlice";

function Main() {
    const { isAuthorized } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchData = async () => {
        const token = localStorage.getItem("userToken");

        const { data } = await axios.get("/api/v1/data", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .catch((e) => console.log(e));
        dispatch(commentsActions.setChannels(data.channels));
    }
    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login")
        } else {
            fetchData();
        };
    });

    return (
        <div className="vh-100 d-flex flex-column">
            <div className="navbar border px-5">
                <a href="/" className="navbar-brand">Chat</a>
                <Button className="btn navbar-bth">Выйти</Button>
            </div>
            <div className="container border h-100 my-4">
                <div className="row h-100">
                    <div id="channels-container" className="col-4 h-100 border-end py-3">
                        <p className="text-center">Каналы</p>
                    </div>
                    <div id="chat-container" className="col h-100 py-3">
                        <div className="d-flex flex-column h-100">
                            <p className="text-center">Чат канала</p>
                            <div className="overflow-hidden">
                            </div>
                            <div className="mt-auto mb-3">
                                <form >
                                    <div className="d-flex gap-2">
                                        <input className="w-100 border rounded-2 px-2" type="text" placeholder="Введите текст..." />
                                        <Button>Отправить</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Main;
