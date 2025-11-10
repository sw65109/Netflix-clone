import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import './NewAndPopular.css'

const NewAndPopular = () => (
  <div className="new-layout">
    <Navbar />
    <main className="new-wrapper">
      <header className="new-heading">
        <h1>New & Popular</h1>
        <p>Fresh drops and trending picks to keep your queue stocked.</p>
      </header>
      <section className="new-section">
        <TitleCards title="Trending Now" category="popular" />
        <TitleCards title="Just Released" category="now_playing" />
        <TitleCards title="Coming Soon" category="upcoming" />
      </section>
    </main>
    <Footer />
  </div>
);

export default NewAndPopular;
