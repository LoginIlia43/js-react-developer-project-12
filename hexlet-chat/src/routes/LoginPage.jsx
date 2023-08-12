import React from "react";
import LoginForm from "../components/LoginForm";
import HeaderComponent from "../components/HeaderComponent";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="h-100 d-flex flex-column">
      <HeaderComponent />
      <div className="d-flex h-100 flex-column justify-content-center">
        <LoginForm />
        <div className="container col-lg-6 py-3 text-center">
          <span className="mx-2">{t("login.noAcc")}</span>
          <a href="/signup">{t("login.toRegister")}</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
