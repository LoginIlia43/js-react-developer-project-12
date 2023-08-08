import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
    const isAuthorized = Boolean(localStorage.getItem("userToken"));
    const navigate = useNavigate();

    const handleExitClick = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="navbar border px-5 shadow-sm">
            <div className="container">
                <a href="/" className="navbar-brand">Hexlet Chat</a>
                {isAuthorized && <Button className="btn navbar-bth" onClick={handleExitClick}>Выйти</Button>}
            </div>
        </div>
    )
}

export default HeaderComponent;
