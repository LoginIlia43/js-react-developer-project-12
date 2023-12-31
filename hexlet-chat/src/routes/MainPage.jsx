import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../components/AuthContext';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import MessageForm from '../components/MessageForm';
import ModalComponent from '../components/ModalComponent';
import { actions as modalActions } from '../slices/modalSlice';
import HeaderComponent from '../components/HeaderComponent';

const MainPage = (props) => {
  const { fetchData } = props;
  const { isAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [fetchData, isAuthorized, navigate]);

  const messages = useSelector((state) => Object.values(state.messages.entities));
  const { currentChannelId } = useSelector((state) => state.currentChannelId);
  const currentChannelMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  const handleAddChannel = () => {
    dispatch(modalActions.toggleIsShow());
    dispatch(modalActions.setType('addChannel'));
  };

  return (
    <>
      <ModalComponent />
      <div className="h-100 d-flex flex-column">
        <HeaderComponent />
        <div className="container border h-100 my-4 overflow-hidden shadow">
          <div className="row h-100">
            <div
              id="channels-container"
              className="col-4 h-100 border-end py-3 overflow-y-auto"
              style={{ maxWidth: '260px' }}
            >
              <div className="d-flex justify-content-between">
                <p>Каналы</p>
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleAddChannel}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Channels />
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
      </div>
    </>
  );
};

export default MainPage;
