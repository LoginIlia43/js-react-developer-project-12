import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/esm/Button";
import socket from "../socket.js";
import { useSelector } from "react-redux";

function MessageForm() {
    const username = localStorage.getItem("username");
    const { currentChannelId } = useSelector((state) => state.currentChannelId);

    return (
        <div className="d-flex gap-2">
            <Formik
                initialValues={{ 
                    message: "",
                }}
                onSubmit={(message, { setSubmitting, resetForm }) => {
                    socket.emit(
                        "newMessage",
                        ({ "message": message.message, "username": username, "channelId": currentChannelId }),
                        ({ status }) => {
                            if (status !== "ok") {
                                console.log("Error with sending new message");
                            };
                    });
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="w-100">
                        <div className="d-flex gap-2">
                            <Field className="w-100 flex-grow-1 px-2 border rounded-3 " required type="text" name="message" placeholder="Введите сообщение..." />
                            <Button type="submit" disabled={isSubmitting}>
                                Отправить
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default MessageForm;
