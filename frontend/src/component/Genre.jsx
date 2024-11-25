import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/genreSlice';
import { selectGenres } from '../redux/genreSlice';
import EventIcon from '@mui/icons-material/ConfirmationNumber';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

const genreIcons = {
  Comedy: <TheaterComedyIcon style={{ fontSize: 50 }} />,
  Music: <MusicNoteIcon style={{ fontSize: 50 }} />,
  Concert: <MicExternalOnIcon style={{ fontSize: 50 }} />,
  Workshop: <EventIcon style={{ fontSize: 50 }} />,
  'Health & Wellness': <DomainAddIcon style={{ fontSize: 50 }} />,
};

const Genre = ({ onGenreSelect }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.events);
  const genres = useSelector(selectGenres);
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
    const intervalId = setInterval(() => dispatch(fetchEvents()), 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [status, dispatch]);

  if (status === 'loading') return <div className="text-center">Loading...</div>;
  if (status === 'failed') return <div className="text-center text-red-500">Error: {error}</div>;

  const handleGenreClick = (genre) => {
    const newSelected = genre === selectedGenre ? null : genre;
    setSelectedGenre(newSelected);
    onGenreSelect(newSelected); // Pass the selected genre to Home component
  };

  return (
    <section className="genre-section ">
      <div className="flex items-center mb-6 pl-6">
        <span className='text-red-600'><EventIcon style={{ fontSize: 50 }} /></span>
        <h2 className="text-4xl font-bold ml-2 text-red-600">Browse Events by Genre</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {genres.map((genre) => {
          const Icon = genreIcons[genre.name] || <TheaterComedyIcon />;
          return (
            <div
              key={genre.name}
              className={`genre-item ${selectedGenre === genre.name ? 'selected' : ''}`}
              onClick={() => handleGenreClick(genre.name)}
            >
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                {Icon}
                <h3 className="text-lg font-semibold mb-1">{genre.name}</h3>
                <p className="text-sm text-gray-600">
                  {`${genre.eventsCount} event${genre.eventsCount !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Genre;