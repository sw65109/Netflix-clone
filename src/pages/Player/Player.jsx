import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_Access_Key } from "../../config";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    })
    return () => unsubscribe();
   }, [navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_Access_Key}`,
      },
    };

    const controller = new AbortController();

    const loadVideo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          { ...options, signal: controller.signal }
        );
        if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`)

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setError("No video found for this movie");
          setApiData({ name: "", key: "", published_at: "", type: "" });
        } else {
          setApiData(data.results[0]);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          setError("Failed to load trailer.")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadVideo();

    return () => controller.abort()
  }, [id]);

  if (loading) {
    return (
      <div className="player-spinner">
        <img src={netflix_spinner} alt="Loading spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-error">
        <img 
          src={back_arrow_icon}
          alt="Go back"
          onClick={() => navigate(-1)} 
        />
        <p>{error}</p>
      </div>
    );
  }

  return (
        <div className="player">
      <img
        src={back_arrow_icon}
        alt="Go back"
        onClick={() => {
          navigate(-1);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>
          {apiData.published_at ? apiData.published_at.slice(0, 10) : "No date"}
        </p>
        <p>{apiData.name || "Untitiled"}</p>
        <p>{apiData.type || "Unknown type"}</p>
      </div>
    </div>
  );
};

export default Player;
