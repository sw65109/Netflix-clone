import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Kids.css";

const Kids = () => {
  const { switchProfile } = useProfile();

  useEffect(() => {
    switchProfile("kids");
  }, [switchProfile]);

  return (
    <div className="kids-layout">
      <Navbar />
      <main className="kids-wrapper">
        <header className="kids-heading">
          <h1>Kids</h1>
          <p>
            Friendly favorites, cartoons, and adventures for younger viewers.
          </p>
        </header>
        <section className="kids-section">
          <TitleCards
            title="Kids Movies"
            path="discover"
            category="movie"
            mediaType="movie"
            queryParams={{
                with_genres: "10751",
                include_adult: "false",
                sort_by: "popularity.desc"
            }} 
          />
          <TitleCards
            title="Animated Hits"
            path="discover"
            category="movie"
            mediaType="movie"
            queryParams={{
              with_genres: "16,10751",
              include_adult: "false",
              sort_by: "popularity.desc",
            }}
          />
          <TitleCards
            title="Family Favorites"
            path="discover"
            category="movie"
            mediaType="movie"
            queryParams={{
              with_genres: "10751",
              include_adult: "false",
              sort_by: "vote_average.desc",
              vote_count_gte: "200",
            }}
          />
          <TitleCards
            title="Kids TV"
            path="discover"
            category="tv"
            mediaType="tv"
            queryParams={{
              with_genres: "10762",
              sort_by: "popularity.desc",
              include_null_first_air_dates: "false",
            }}
          />
          <TitleCards
            title="Animated Series"
            path="discover"
            category="tv"
            mediaType="tv"
            queryParams={{
              with_genres: "16",
              sort_by: "popularity.desc",
              include_null_first_air_dates: "false",
            }}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Kids;
