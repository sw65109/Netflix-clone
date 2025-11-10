import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./Movies.css";

const Movies = () => (
  <div className="movies-layout">
    <Navbar />
    <main className="movies-wrapper">
      <header className="movies-heading">
        <h1>Movies</h1>
        <p>Blockbuster, hidden gems, and everything in one place.</p>
      </header>
      <section className="movies-section">
        <TitleCards title="Popular on Netflix" category="popular" />
        <TitleCards title="Award Winners" category="top_rated" />
        <TitleCards title="New Arrivals" category="now_playing" />
      </section>
    </main>
    <Footer />
  </div>
);

export default Movies;
