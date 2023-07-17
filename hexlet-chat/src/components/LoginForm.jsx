import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "./AuthContext";
// import Main from "../routes/Main";

function LoginForm() {
    const navigate = useNavigate();
    const { isAuthorized, setAuthorized } = useContext(AuthContext);

    return (
        <div>
            <h1>Login form</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                validationSchema={loginSchema}
                onSubmit={async ({ username, password }) => {
                    // console.log({ username, password })
                    await axios
                        .post('/api/v1/login', { username, password })
                        .then((response) => localStorage.setItem("userToken", response.data.token))
                        .then(() => setAuthorized(true))
                        .catch((e) => console.log(e.message));
                    if (isAuthorized) {
                        navigate("/");
                    };
                    }}
            >
                <Form>
                    <label>Login</label>
                    <Field type="text" name="username" />
                    <label>Password</label>
                    <Field type="password" name="password" />
                    <button type="submit">Submit</button>
                </Form>
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
