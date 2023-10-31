import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GENRE_FETCH } from '../../redux/actions';
import { IGenresData } from '../../types/interfaces';

const Genres = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.genres.genreData);

  useEffect(() => {
    dispatch({ type: GENRE_FETCH });
  }, []);

  return (
    <section>
      <ol>
        {genres.map((genre: IGenresData) => (
          <li key={genre._id}>{genre.name}</li>
        ))}
      </ol>
    </section>
  );
};

export default Genres;
