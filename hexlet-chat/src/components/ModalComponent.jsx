/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { notifySuccess } from '../notify.js';
import { actions as modalActions } from '../slices/modalSlice';
import socket from '../socket';

const ModalComponent = () => {
  const modalType = useSelector((state) => state.modal.type);
  const isShow = useSelector((state) => state.modal.isShow);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(modalActions.toggleIsShow());

  const titles = {
    addChannel: 'Добавить канал',
    renameChannel: 'Переименовать канал',
    removeChannel: 'Удалить канал',
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
      <Modal.Body>{dispatchModalChildren[modalType]}</Modal.Body>
    </Modal>
  );
}

const ModalAddChannel = (props) => {
  const { t } = useTranslation();

  const { handleClose } = props;
  const channels = Object.values(
    useSelector((state) => state.channels.entities)
  ).map(({ name }) => name);

  const channelSchema = Yup.object().shape({
    channel: Yup.string()
      .required('')
      .min(3, t('validation.from3to20'))
      .max(20, t('validation.from3to20'))
      .notOneOf([...channels, null], t('validation.unique')),
  });

  return (
    <>
      <Formik
        initialValues={{
          channel: '',
        }}
        validationSchema={channelSchema}
        onSubmit={({ channel }, { setSubmitting, resetForm }) => {
          socket.emit('newChannel', {
            name: channel,
            author: localStorage.getItem('username'),
          });
          setSubmitting(false);
          resetForm();
          handleClose();
          notifySuccess(t('notify.add'));
        }}
      >
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form id="channel-add-form">
              <label className="visually-hidden" htmlFor="channel">
                Имя канала
              </label>
              <Field
                id="channel"
                className="form-control"
                type="text"
                placeholder={t('mainP.channelNameInput')}
                name="channel"
                required
                autoComplete="off"
                autoFocus
              />
              {errors.channel && touched.channel && (
                <div className="text-danger pt-3">{errors.channel}</div>
              )}
              <div className="d-flex gap-2 justify-content-end mt-3">
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Подтвердить
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const ModalRenameChannel = (props) => {
  const { t } = useTranslation();

  const { handleClose } = props;
  const channels = Object.values(
    useSelector((state) => state.channels.entities)
  ).map(({ name }) => name);

  const id = useSelector((state) => state.modal.channelId);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.from3to20'))
      .max(20, t('validation.from3to20'))
      .notOneOf(channels, t('validation.unique')),
  });

  return (
    <>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={channelSchema}
        onSubmit={({ name }, { setSubmitting, resetForm }) => {
          socket.emit('renameChannel', { id: id, name: name });
          setSubmitting(false);
          resetForm();
          handleClose();
          notifySuccess(t('notify.rename'));
        }}
      >
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form id="channel-rename-form">
              <label className="visually-hidden" htmlFor="name">
                Имя канала
              </label>
              <Field
                id="name"
                className="form-control"
                type="text"
                placeholder={t('mainP.channelNameInput')}
                name="name"
                autoComplete="off"
                required
                autoFocus
              />
              {errors.name && touched.name && (
                <div className="text-danger pt-3">{errors.name}</div>
              )}
              <div className="d-flex gap-2 justify-content-end mt-3">
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Подтвердить
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const ModalRemoveChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const id = useSelector((state) => state.modal.channelId);

  return (
    <>
      <Formik
        initialValues={{
          id,
        }}
        onSubmit={({ id }, { setSubmitting }) => {
          socket.emit('removeChannel', { id: id });
          setSubmitting(false);
          handleClose();
          notifySuccess(t('notify.remove'));
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form id="channel-remove-form">
              <div>Уверены?</div>
              <div className="d-flex gap-2 justify-content-end mt-3">
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button
                  className="btn-danger"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  autoFocus
                >
                  Подтвердить
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default ModalComponent;
