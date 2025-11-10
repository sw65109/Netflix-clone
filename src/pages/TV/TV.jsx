import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./TV.css"

const TV = () => (
    <div className="tv-layout">
        <Navbar />
        <main className="tv-wrapper">
            <header className="tv-heading">
                <h1>TV Shows</h1>
                <p>Pick a series and keep binge watching without missing a beat.</p>
            </header>
            <section className="tv-section">
                <TitleCards title="Popular" category="popular" mediaType="tv" />
                <TitleCards title="Top Rated" category="top_rated" mediaType="tv" />
                <TitleCards title="On The Air" category="on_the_air" mediaType="tv" />
                <TitleCards title="Airing Today" category="airing_today" mediaType="tv" />
            </section>
        </main>
        <Footer />
    </div>
)

export default TV;