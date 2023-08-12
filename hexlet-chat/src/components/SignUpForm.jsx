import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "./AuthContext";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { notifyError } from "../notify";

function SignUpForm() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuthorized } = useContext(AuthContext);
    const { t } = useTranslation();
    
    const signUpSchema = Yup.object().shape({
        username: Yup.string()
            .required(t("validation.required"))
            .min(3, t("validation.from3to20"))
            .max(20, t("validation.from3to20")),
        password: Yup.string()
            .required(t("validation.required"))
            .min(6, t("validation.from6")),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], t("validation.passwords")),
    });

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
                            .catch((e) => {
                                if (e.response.status === 409) {
                                    setError(t("validation.userExist"));
                                } else {
                                    notifyError(t("errors.connection"));
                                }
                            });
                        }}
                >
                    {({ errors, touched }) => {
                        return (
                    <div className="row justify-content-center">
                        <Form className="col-lg-6 border py-2">
                            <h1 className="text-center">{t("register.header")}</h1>
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder={t("register.username")}
                                    autoComplete="off"
                                    autoFocus
                                    required />
                                <label
                                    className="form-label d-none"
                                    htmlFor="username"
                                >
                                    {t("register.username")}
                                </label>
                            </div>
                            {errors.username && touched.username && 
                                <div className="text-danger">{errors.username}</div>}
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder={t("register.password")}
                                    autoComplete="off"
                                    required />
                                <label className="form-label d-none" htmlFor="password">{t("register.password")}</label>
                            </div>
                            {errors.password && touched.password &&
                                <div className="text-danger">{errors.password}</div>}
                            <div className="py-2">
                                <Field
                                    className="form-control"
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    placeholder={t("register.confirmPassword")}
                                    autoComplete="off"
                                    required />
                                <label className="form-label d-none" htmlFor="password2">{t("register.confirmPassword")}</label>
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


export default SignUpForm;
