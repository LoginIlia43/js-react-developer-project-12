import React from "react";
import LoginForm from "../components/LoginForm";
import HeaderComponent from "../components/HeaderComponent";

function LoginPage() {
    return (
        <div className="h-100 d-flex flex-column">
            <HeaderComponent />
            <div className="d-flex h-100 flex-column justify-content-center">
                <LoginForm />
                <div className="container col-lg-6 py-3 text-center">
                    <span className="mx-2">Нет аккаунта?</span>
                    <a href="/signup">Регистрация</a> 
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
