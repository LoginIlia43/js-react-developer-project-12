import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const HandleClick = () => navigate('/');

  return (
    <div className="row vh-100 align-items-center">
      <div className="text-center aligh-middle">
        <h1>
          404
          <br />
          Страница не найдена
        </h1>
        <Button onClick={HandleClick}>Вернуться на главную</Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
