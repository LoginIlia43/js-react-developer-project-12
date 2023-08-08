import Button from "react-bootstrap/esm/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
    const isAuthorized = Boolean(localStorage.getItem("userToken"));
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleExitClick = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="navbar border px-5 shadow-sm">
            <div className="container">
                <a href="/" className="navbar-brand">{t("nav.chat")}</a>
                {isAuthorized && <Button className="btn navbar-bth" onClick={handleExitClick}>{t("nav.exitBtn")}</Button>}
            </div>
        </div>
    )
}

export default HeaderComponent;
