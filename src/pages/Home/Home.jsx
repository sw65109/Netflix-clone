import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { TMDB_Access_Key } from "../../config";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; 

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_Access_Key}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setHeroMovie(data.results[randomIndex]);
        } else {
          setError("No movies found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load movies");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="home-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!heroMovie) {
    return <div>No movie data available</div>;
  }

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img
          src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
          alt={heroMovie.title}
          className="banner-img"
        />
        <div className="hero-caption">
          <p>{heroMovie.overview}</p>
          <div className="hero-btns">
            <button
              className="btn"
              onClick={() => navigate(`/player/${heroMovie.id}`)}
            >
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards />
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;