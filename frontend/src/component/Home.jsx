import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Carousell from "./Carousell";
import TrendingCards from "./TrendingCrads";
// import Show from "./Components/show";
import Genre from "./Genre";
import ComedyEvents from "./ComedyEvents";
import ConcertEvents from "./ConcertEvents";
import WorkshopsEvents from "./WorkshopsEvents";
import HealthWellnessEvents from "./HealthWellnessEvents";
import EventCalendar from './EventCalendar';
import MusicEvents from './MusicEvents';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { selectAllEvents, selectGenres } from '../redux/genreSlice'; 



const genreComponents = {
  Comedy: ComedyEvents,
  Music: MusicEvents,
  Concert: ConcertEvents,
  Workshop: WorkshopsEvents,
  'Health & Wellness': HealthWellnessEvents,
};

const Home = () => {
const navigate = useNavigate();
const [selectedGenre, setSelectedGenre] = useState(null); // State to track selected genre
const allEvents = useSelector(selectAllEvents); 
const genres = useSelector(selectGenres);


const handleGenreSelect = (genre) => {
  setSelectedGenre(genre); // Update the selected genre
};
 

const SelectedEventsComponent = selectedGenre ? genreComponents[selectedGenre] : null;


  return (
    <>
    <Navbar />
    <Carousell/>
      <TrendingCards />
      <Genre onGenreSelect={handleGenreSelect} genres={genres} />

      {/* Conditionally render events based on selected genre */}
      <div>
        {SelectedEventsComponent ? (
          <SelectedEventsComponent events={allEvents.filter(event => event.category === selectedGenre)} />
        ) : (
          Object.entries(genreComponents).map(([genreName, Component]) => (
            <Component key={genreName} events={allEvents.filter(event => event.category === genreName)} />
          ))

        )}
      </div>
     <Footer />
    </>
  )
}

export default Home;