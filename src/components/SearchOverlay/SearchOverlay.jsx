import { useEffect, useMemo, useState } from "react";
import "./SearchOverlay.css";
import { TMDB_Access_Key } from "../../config";
import fallbackPoster from "../../assets/logo.png";
import useMyList from "../../hooks/useMyList";
import { showToast } from "../../utils/toastUtils";
import { Link } from "react-router-dom";

const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_Access_Key}`,
  },
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const { addItem, removeItem, isInList } = useMyList();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setDebouncedQuery("");
      setResults([]);
      setStatus("idle");
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    if (!debouncedQuery) {
      setResults([]);
      setStatus("idle");
      setError(null);
      return;
    }

    const runSearch = async () => {
      setStatus("loading");
      setError(null);
      try {
        const url = new URL("https://api.themoviedb.org/3/search/multi");
        url.searchParams.set("query", debouncedQuery);
        url.searchParams.set("language", "en-US");
        url.searchParams.set("page", "1");
        url.searchParams.set("include_adult", "false");
        const response = await fetch(url, {
          ...FETCH_OPTIONS,
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }
        const data = await response.json();
        if (!controller.signal.aborted) {
          const filtered =
            data.results?.filter(
              (item) => item.media_type === "movie" || item.media_type === "tv"
            ) ?? [];
          setResults(filtered);
          setStatus("loaded");
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          setStatus("error");
          setError("We couldn't fetch results right now. Try again later.");
        }
      }
    };

    runSearch();
    return () => controller.abort();
  }, [debouncedQuery]);

  const headline = useMemo(() => {
    if (!debouncedQuery) return "Search Netflix";
    if (status === "loading") return `Searching for "${debouncedQuery}"...`;
    if (status === "loaded") return `Results for "${debouncedQuery}"`;
    if (status === "error") return "Something went wrong";
    return "Search Netflix";
  }, [debouncedQuery, status]);

  const handleToggleList = (item) => {
    const mediaType = item.media_type === "tv" ? "tv" : "movie";
    const title =
      item.title || item.original_title || item.name || "Untitled Title";
    const payload = {
      id: item.id,
      title,
      mediaType,
      posterPath: item.poster_path ?? null,
      backdropPath: item.backdrop_path ?? null,
    };
    if (isInList(item.id, mediaType)) {
      removeItem(item.id, mediaType);
      showToast("info", `${title} removed from My List`, { autoClose: 2500 });
    } else {
      addItem(payload);
      showToast("success", `${title} added to My List`, { autoClose: 2500 });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <button
        type="button"
        className="search-overlay__backdrop"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="search-overlay__panel">
        <header className="search-overlay__header">
          <h2>{headline}</h2>
          <button type="button" onClick={onClose} aria-label="Close search">
            X
          </button>
        </header>
        <form
          className="search-overlay__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            placeholder="Titles, people, genres"
            value={query}
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-overlay__clear"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
        </form>

        <section className="search-overlay__results">
          {status === "idle" && (
            <p className="search-overlay__placeholder">
              Try "Stranger Things", "Animated", or "Comedy".
            </p>
          )}
          {status === "error" && (
            <p className="search-overlay__error">{error}</p>
          )}
          {status === "loaded" && results.length === 0 && (
            <p className="search-overlay__placeholder">
              No results for "{debouncedQuery}". Try another keyword.
            </p>
          )}
          {results.length > 0 && (
            <div className="search-overlay__grid">
              {results.map((item) => {
                const mediaType = item.media_type === "tv" ? "tv" : "movie";
                const title =
                  item.title || item.original_title || item.name || "Untitled";
                const imageSrc = item.poster_path
                  ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                  : item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  : fallbackPoster;
                const saved = isInList(item.id, mediaType);

                return (
                  <article
                    key={`${mediaType}-${item.id}`}
                    className="search-overlay__card"
                  >
                    <Link
                      to={`/player/${item.id}`}
                      className="search-overlay__thumb"
                      title={title}
                      onClick={onClose}
                    >
                      <img src={imageSrc} alt={title} />
                    </Link>
                    <div className="search-overlay__meta">
                      <p>{title}</p>
                      <button
                        type="button"
                        className={`search-overlay__cta ${
                          saved ? "search-overlay__cta--saved" : ""
                        }`}
                        onClick={() => handleToggleList(item)}
                      >
                        {saved ? "Remove" : "Add"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchOverlay;
