import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "./AuthContext";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function SignUpForm() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuthorized } = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <div className="container">
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        password2: "",
                    }}
                    validationSchema={signUpSchema}
                    onSubmit={async ({ username, password }) => {
                        await axios
                            .post('/api/v1/signup', { username, password })
                            .then((response) => localStorage.setItem("userToken", response.data.token))
                            .then(() => setAuthorized())
                            .then(() => navigate("/"))
                            .then(() => localStorage.setItem("username", username))
                            .catch((e) => setError(
                                e.response.status === 409 ? "Пользователь уже существует" : "Ошибка сети"
                                )
                            );
                        }}
                >
                    {({ errors, touched}) => {
                        return (
                    <div className="row justify-content-center">
                        <Form className="col-lg-6 border py-2">
                            <h1 className="text-center">{t("register.header")}</h1>
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    placeholder={t("register.username")}
                                    autoFocus
                                    required />
                            </div>
                            {errors.username && touched.username && 
                                <div className="text-danger">{errors.username}</div>}
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder={t("register.password")}
                                    required />
                            </div>
                            {errors.password && touched.password &&
                                <div className="text-danger">{errors.password}</div>}
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="password2"
                                    placeholder={t("register.confirmPassword")}
                                    required />
                            </div>
                            {errors.password2 && touched.password2 &&
                                <div className="text-danger">{errors.password2}</div>}
                            {error && <div className="text-danger">{error}</div>}
                            <div className="text-center py-2">
                                <Button
                                    className="px-4 w-100"
                                    variant="outline-primary"
                                    type="submit"
                                >
                                    {t("register.registerBtn")}
                                </Button>
                            </div>
                        </Form>
                    </div>
                    )}}
                </Formik>
            </div>
    )
}

const signUpSchema = Yup.object().shape({
    username: Yup.string()
        .required("Обязательное поле")
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов"),
    password: Yup.string()
        .required("Обязательное поле")
        .min(6, "Не менее 6 символов"),
    password2: Yup.string()
        .required("")
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
});

export default SignUpForm;
