import { Link, useParams } from "react-router-dom";
import "./Detail.css";
import { useEffect, useState } from "react";
import { fetchItemById } from "../../services/api";
import StatBar from "../../components/StatBar/StatBar";

function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //page functions

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPokemon(null);

    fetchItemById(id)
      .then((data) => {
        if (!cancelled) setPokemon(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div className="detail-status">Loading…</div>;
  if (error)
    return (
      <div className="detail-status detail-status--error">Error: {error}</div>
    );
  if (!pokemon) return null;

  const artwork = pokemon.sprites?.other?.["official-artwork"]?.front_default;
  return (
    <div className="detail">
      <Link to="/" className="detail-back">
        {"<--- View all Pokemons"}
      </Link>
      <div className="detail-card">
        <div className="detail-image__wrap">
          <img
            src={artwork}
            alt={pokemon.name}
            loading="lazy"
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <h2 className="detail-name">
            {pokemon.name} &nbsp;
            <span className="detail-id">#{pokemon.id}</span>
          </h2>

          <div className="detail-types">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={`type-badge type-badge__${t.type.name}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="detail-metrics">
            <div className="metric">
              <span className="metric-label">Height</span>
              <span className="metric-value">{pokemon.height / 10}m</span>
            </div>
            <div className="metric">
              <span className="metric-label">Weight</span>
              <span className="metric-value">{pokemon.weight / 10}kg</span>
            </div>
            <div className="metric">
              <span className="metric-label">Base XP</span>
              <span className="metric-value">
                {pokemon.base_experience ?? "—"}
              </span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Abilities</h3>
            <ul className="ability-list">
              {pokemon.abilities.map((a) => (
                <li key={a.ability.name} className="ability-list__item">
                  {a.ability.name}
                  {a.is_hidden && (
                    <span className="ability-list__hidden">hidden</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>Base Stats</h3>
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                label={s.stat.name}
                value={s.base_stat}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
