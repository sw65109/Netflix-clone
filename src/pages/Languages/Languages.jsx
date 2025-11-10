import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import './Languages.css'


const Languages = () => (
    <div className="languages-layout">
        <Navbar />
        <main className="languages-wrapper">
            <header className="languages-heading">
                <h1>Browse by Languages</h1>
                <p>Discover titles with audio and subtitles tailored for you.</p>
            </header>
            <section className="languages-section">
                <TitleCards title="English Favorites" category="popular" />
                <TitleCards title="Spanish Spotlight" category="top_rated" />
                <TitleCards title="International Hits" category="now_playing" />
            </section>
        </main>
        <Footer />
    </div>
);

export default Languages