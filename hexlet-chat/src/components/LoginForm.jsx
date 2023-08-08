import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "./AuthContext";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function LoginForm() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuthorized } = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <div className="container">
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
                            .then(() => navigate("/"))
                            .then(() => localStorage.setItem("username", username))
                            .catch((e) => setError(
                                e.response.status === 401 ? "Неверные имя пользователя или пароль" : "Ошибка сети"
                            ));

                        }}
                >
                    <div className="row justify-content-center">
                        <Form className="col-lg-6 border py-2 shadow-sm">
                            <h1 className="text-center">{t("login.header")}</h1>
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    placeholder={t("login.username")}
                                    required
                                    autoFocus />
                            </div>
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder={t("login.password")}
                                    required />
                            </div>
                            {error ? <p className="text-danger my-0">{error}</p> : null}
                            <div className="text-center py-2">
                                <Button 
                                    className="px-4 w-100"
                                    variant="outline-primary"
                                    type="submit"
                                >
                                    {t("login.enter")}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Formik>
            </div>
    )
}

const loginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
});

export default LoginForm;
