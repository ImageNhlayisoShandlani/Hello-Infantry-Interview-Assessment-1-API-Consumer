import { useCallback, useMemo, useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { useDebounce } from "../hooks/useDebounce";
import { fetchItems, fetchAllNames } from "../services/api";
import "./Home.css";

const PAGE_SIZE = 20;

function Home() {
  //Components states
  const [allNames, setAllNames] = useState([]);
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [totalCount, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceSearch = useDebounce(search, 300);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  //component functions
  const searchResults = useMemo(() => {
    if (!debounceSearch) return null;
    return allNames.filter((p) =>
      p.name.toLowerCase().includes(debounceSearch.toLowerCase()),
    );
  }, [debounceSearch, allNames]);

  //list of items, display search or fecthed paginated items
  const displayItems = searchResults ?? items;

  //Pagination handles, useCallback used to limit re-renders
  const goNext = useCallback(
    () => setPage((p) => Math.min(p + 1, totalPages - 1)),
    [totalPages],
  );
  const goPrev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  const handleSearchChange = useCallback((e) => {
    //e.target.preventDefault();
    setSearch(e.target.value);
    if (!e.target.value) setPage(0);
  }, []);

  const getId = useCallback((url) => {
    if (!url) return null;
    const parts = url.split("/").filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  });

  useEffect(() => {
    fetchAllNames()
      .then((data) => setAllNames(data.results))
      .catch(() => {});
  }, []);

  useEffect(() => {
    // If user is searching, skip the paginated fetch
    if (debounceSearch) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchItems({ offset: page * PAGE_SIZE, limit: PAGE_SIZE })
      .then((data) => {
        if (cancelled) return;
        setItems(data.results);
        setTotal(data.count);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };

  }, [page, debounceSearch]);

  return (
    <div className="home-page">
      {/* Search */}
      <div className="home-search__wrapper">
        <input
          type="search"
          className="home-search"
          placeholder="Search Pokemons..."
          value={search}
          onChange={handleSearchChange}
          aria-label="Search Pokemon"
        />
        {debounceSearch && (
          <p className="home-resulst__count">
            {searchResults?.length ?? 0} result
            {searchResults?.length !== 1 ? "s" : ""} for "{debounceSearch}"
          </p>
        )}
      </div>

      {/* Loading states*/}
      {loading && <div className="home-status">Loading Pokemons…</div>}
      {error && (
        <div className="home-status home-status__error">Error: {error}</div>
      )}

      {/* Pokemon grid items */}
      {!loading && !error && (
        <div className="pokemon-grid">
          {displayItems.map((pokemon) => {
            const id = getId(pokemon.url);
            return (
              <PokemonCard key={pokemon.name} name={pokemon.name} id={id} />
            );
          })}
        </div>
      )}

      {/* Pagination — hidden while searching */}
      {!debounceSearch && !loading && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={goPrev}
            disabled={page === 0}
          >
            ← Prev
          </button>
          <span className="pagination-info">
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={goNext}
            disabled={page >= totalPages - 1}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
