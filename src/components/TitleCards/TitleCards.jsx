import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { TMDB_Access_Key } from "../../config";
import fallbackPoster from "../../assets/logo.png";
import useMyList from "../../hooks/useMyList";
import { showToast } from "../../utils/toastUtils"; // CHANGE: keep toast helper

const TitleCards = ({
  title,
  category,
  mediaType = "movie",
  path,
  queryParams,
}) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const cardsRef = useRef();

  const { addItem, removeItem, isInList } = useMyList();

  const querySignature = useMemo(
    () => JSON.stringify(queryParams ?? {}),
    [queryParams]
  );

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_Access_Key}`,
      },
    }),
    []
  );
 
  const handleWheel = (event) => {
    if (!cardsRef.current) return;
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const handleToggleList = useCallback(
    (card) => {
      if (!card) return;
      const displayTitle =
        card.title || card.original_title || card.name || "Untitled";

      const payload = {
        id: card.id,
        title: displayTitle,
        mediaType,
        posterPath: card.poster_path ?? null,
        backdropPath: card.backdrop_path ?? null,
      };

      if (isInList(card.id, mediaType)) {
        removeItem(card.id, mediaType);
        showToast("info", `${displayTitle} removed from My List`, {
          autoClose: 2500,
        }); 
      } else {
        addItem(payload);
        showToast("success", `${displayTitle} added to My List`, {
          autoClose: 2500,
        }); 
      }
    },
    [addItem, removeItem, isInList, mediaType]
  );

  useEffect(() => {
    const controller = new AbortController();
    const currentRef = cardsRef.current;

    const loadTitles = async () => {
      try {
        const parsedQuery = JSON.parse(querySignature || "{}");
        const params = new URLSearchParams({ language: "en", page: "1" });
        Object.entries(parsedQuery).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
          }
        });

        const baseCategory = category ?? "now_playing";
        const normalizedPath = path
          ? `${path.replace(/\/$/, "")}/${baseCategory}`
          : `${mediaType}/${baseCategory}`;
        const url = `https://api.themoviedb.org/3/${normalizedPath}?${params.toString()}`;

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`TMDB request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!controller.signal.aborted) {
          setApiData(data.results ?? []);
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          setError("Failed to load titles");
        }
      }
    };

    loadTitles();

    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      controller.abort();
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category, mediaType, path, querySignature, options]);

  return (
    <div className="title-cards">
      <h2>{title ?? "Popular on Netflix"}</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card) => {
            const displayTitle =
              card.title || card.original_title || card.name || "Untitled";
            const imageSrc = card.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
              : fallbackPoster;
            const saved = isInList(card.id, mediaType);

            return (
              <article
                className="title-card"
                key={`${mediaType}-${card.id}`}
                aria-label={displayTitle}
              >
                <Link
                  to={`/player/${card.id}`}
                  className="title-card__link"
                  title={displayTitle}
                >
                  <img src={imageSrc} alt={displayTitle} />
                </Link>
                <div className="title-card__meta">
                  <p>{displayTitle}</p>
                  <button
                    type="button"
                    className={`title-card__cta ${
                      saved ? "title-card__cta--saved" : ""
                    }`}
                    onClick={() => handleToggleList(card)}
                  >
                    {saved ? "Remove" : "Add to My List"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TitleCards;
