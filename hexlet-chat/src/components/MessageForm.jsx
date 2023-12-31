import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { notifyError } from '../notify.js';
import socket from '../socket.js';

const MessageForm = () => {
  const username = localStorage.getItem('username');
  const { currentChannelId } = useSelector((state) => state.currentChannelId);
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById('message-form-input').focus();
  }, [currentChannelId]);

  return (
    <div className="d-flex gap-2">
      <Formik
        initialValues={{
          message: '',
        }}
        onSubmit={(message, { setSubmitting, resetForm }) => {
          socket.emit(
            'newMessage',
            {
              username,
              message: message.message,
              channelId: currentChannelId,
            },
            ({ status }) => {
              if (status !== 'ok') {
                notifyError(t('errors.connection'));
              }
            },
          );
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form className="w-100">
            <div className="d-flex gap-2">
              <Field
                id="message-form-input"
                className="w-100 flex-grow-1 px-2 border rounded-3"
                type="text"
                name="message"
                aria-label="Новое сообщение"
                placeholder={t('mainP.messageInput')}
                autoComplete="off"
              />
              <Button type="submit" disabled={isSubmitting || !dirty}>
                {t('mainP.sendBtn')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
