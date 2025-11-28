import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import useMyList from "../../hooks/useMyList";
import "./MyList.css";
import useProfile from "../../hooks/useProfile";
import fallbackPoster from "../../assets/logo.png"
import { showToast } from "../../utils/toastUtils";
import { Link } from "react-router-dom";

const MyList = () => {
  const { profile } = useProfile();
  const { items, removeItem } = useMyList();

  const hasItems = items.length > 0;

  const handleRemove = (id, mediaType, title) => {
    removeItem(id, mediaType);
    showToast("info", `${title} removed from My List`, { autoClose: 2500 });
  };

  return (
    <div className="MyList-layout">
      <Navbar />
      <main className="MyList-wrapper">
        <header className="MyList-heading">
          <h1>{profile === "kids" ? "Kids List" : "My List"}</h1>
          <p>Titles you save to watch later appear here.</p>
        </header>
        <section className="MyList-section empty-state">
          {hasItems ? (
            <div className="MyList-grid">
              {items.map((item) => {
                const imageSrc = item.posterPath
                  ? `https://image.tmdb.org/t/p/w342${item.posterPath}`
                  : item.backdropPath
                  ? `https://image.tmdb.org/t/p/w500${item.backdropPath}`
                  : fallbackPoster;
                return (
                  <article
                    className="title-card MyList-card"
                    key={`${item.mediaType}-${item.id}`}
                  >
                    <Link
                      to={`/player/${item.id}`}
                      className="title-card__link"
                      title={item.title}
                    >
                      <img src={imageSrc} alt={item.title} />
                    </Link>
                    <div className="title-card__meta">
                      <p>{item.title}</p>
                      <button
                        type="button"
                        className="title-card__cta title-card__cta--saved"
                        onClick={() =>
                          handleRemove(item.id, item.mediaType, item.title)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="MyList-empty">
              <p>
                You haven&apos;t saved anything yet. Browse the catalog and tap
                &ldquo;Add to My List&rdquo; to fill this space.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MyList;
