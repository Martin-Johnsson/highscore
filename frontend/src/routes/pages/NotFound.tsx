import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <section>
      <h1>Ooooops...</h1>
      <h2>The page was not found</h2>
      <button onClick={handleNavigateBack}>Get back safely</button>
    </section>
  );
};

export default NotFound;
