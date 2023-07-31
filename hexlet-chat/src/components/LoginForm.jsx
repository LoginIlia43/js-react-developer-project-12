import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "./AuthContext";
import Button from "react-bootstrap/Button";

function LoginForm() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthorized, setAuthorized } = useContext(AuthContext);

    return (
        <div className="container ">
            <div className="text-center">
                <h1 className="">Авторизация</h1>
            </div>
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async ({ username, password }) => {
                        await axios
                            .post('/api/v1/login', { username, password })
                            .then((response) => localStorage.setItem("userToken", response.data.token))
                            .then(() => setAuthorized())
                            .then(() => alert("successfull authorization!"))
                            .then(() => navigate("/"))
                            .then(() => localStorage.setItem("username", username))
                            .catch((e) => setError(e.message));

                        }}
                >
                    <div className="row justify-content-center">
                        <Form className="col-lg-6 border py-2">
                            <div className="py-2">
                                <label className="form-label">Введите имя:</label>
                                <Field className="form-control" type="text" name="username" />
                            </div>
                            <div className="py-2">
                                <label className="form-label">Введите пароль:</label>
                                <Field className="form-control" type="password" name="password" />
                            </div>
                            {error ? <p className="text-danger my-0">{error}</p> : null}
                            <div className="text-center py-2">
                                <Button className="px-4" variant="primary" type="submit">Войти</Button>
                            </div>
                        </Form>
                    </div>
                </Formik>
            </div>
    )
}

const loginSchema = Yup.object().shape({
    login: Yup.string()
        .min(1, "too short"),
    password: Yup.string()
        .min(1, "too short")
});

export default LoginForm;
