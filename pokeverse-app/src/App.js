import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionData, setEvolutionData] = useState([]);
  const [moveTypes, setMoveTypes] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [evolutionImages, setEvolutionImages] = useState([]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const calculateStatRange = (base, isHP = false) => {
    const level = 100;
    const min = isHP
      ? Math.floor(((2 * base + 0 + 0) * level) / 100) + level + 10
      : Math.floor(((2 * base + 0 + 0) * level) / 100) + 5;

    const max = isHP
      ? Math.floor(((2 * base + 31 + Math.floor(252 / 4)) * level) / 100) + level + 10
      : Math.floor(
          (Math.floor(((2 * base + 31 + Math.floor(252 / 4)) * level) / 100) + 5) * 1.1
        );

    return { min, max };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setPokemonData(null);
    setEvolutionData([]);
    setMoveTypes({});
    setAnimateStats(false);

    try {
      //fetch data
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();

      //Get species data
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      )?.flavor_text.replace(/\f/g, ' ') || 'No Pokédex entry available.';

      //evolutions
      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();
      const evoChain = [];
      let evoStage = evoData.chain;

      while (evoStage) {
        evoChain.push(evoStage.species.name);
        evoStage = evoStage.evolves_to[0];
      }

      const evoDetails = await Promise.all(
        evoChain.map(async (name) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          return {
            name: capitalize(name),
            image: data.sprites.other['official-artwork'].front_default
          };
        })
      );

      setEvolutionData(evoChain.map(name => capitalize(name)));
      setEvolutionImages(evoDetails);


      // moves
      const levelUpMoves = data.moves
        .filter((m) =>
          m.version_group_details.some(
            (v) => v.move_learn_method.name === 'level-up'
          )
        )
        .sort((a, b) => {
          const levelA = a.version_group_details.find(v => v.move_learn_method.name === 'level-up')?.level_learned_at || 0;
          const levelB = b.version_group_details.find(v => v.move_learn_method.name === 'level-up')?.level_learned_at || 0;
          return levelA - levelB;
        });

      const moveTypesMap = {};
      await Promise.all(
        levelUpMoves.map(async (m) => {
          const res = await fetch(m.move.url);
          const moveData = await res.json();
          moveTypesMap[m.move.name] = moveData.type.name;
        })
      );

      setPokemonData({ ...data, pokedexEntry: englishEntry, levelUpMoves });
      setEvolutionData(evoChain);
      setMoveTypes(moveTypesMap);

      setTimeout(() => setAnimateStats(true), 100); // animate stat bars
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/img/logo_shortened.png" alt="Pokeverse Logo" className="navbar-logo" />
        </div>
        <div className="navbar-right">
          <button className="nav-button">Home</button>
          <button className="nav-button">About</button>
          <button className="nav-button">Help Us</button>
        </div>
      </nav>


      <img src="/img/logo.png" alt="Pokeverse Logo" className="logo" />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {pokemonData && (
        <div className="pokemon-card">
          <div className="top-section">
            <img
              src={pokemonData.sprites.other['official-artwork'].front_default}
              alt={pokemonData.name}
            />
            <div className="info">
              <h2>{capitalize(pokemonData.name)}</h2>
              <p>
                Type:{' '}
                {pokemonData.types.map((t, i) => (
                  <span key={i} className={`type ${t.type.name}`}>
                    {capitalize(t.type.name)}
                  </span>
                ))}
              </p>

              {pokemonData.pokedexEntry && (
                <div className="pokedex-entry">
                  <h3>Pokédex Entry</h3>
                  <p>{pokemonData.pokedexEntry}</p>
                </div>
              )}
            </div>
          </div>

          <div className="stats">
            <h3>Stats (Min/Max at Level 100)</h3>
            <ul className="stat-list">
              {pokemonData.stats.map((s, i) => {
                const statName = capitalize(s.stat.name);
                const base = s.base_stat;
                const range = calculateStatRange(base, s.stat.name === 'hp');
                const barWidth = Math.min((base / 255) * 100, 100);

                let color = '#e74c3c';
                if (base >= 90) color = '#2ecc71';
                else if (base >= 60) color = '#f1c40f';

                return (
                  <li key={i} className="stat-item">
                    <div className="stat-name">
                      {statName}: Base {base} → Min {range.min} / Max {range.max}
                    </div>
                    <div className="stat-bar-wrapper">
                      <div
                        className="stat-bar"
                        style={{
                          width: animateStats ? `${barWidth}%` : '0%',
                          backgroundColor: color,
                        }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="moves">
            <h3>Moves</h3>
            <ul>
              {pokemonData.levelUpMoves.map((m, i) => {
                const levelData = m.version_group_details.find(
                  (v) => v.move_learn_method.name === 'level-up'
                );
                const level = levelData?.level_learned_at || 0;
                const moveName = capitalize(m.move.name.replace(/-/g, ' '));
                const moveType = moveTypes[m.move.name];

                return (
                  <li key={i}>
                    Lv. {level} –{' '}
                    {moveType && (
                      <span className={`type ${moveType}`}>
                        {capitalize(moveType)}
                      </span>
                    )}{' '}
                    {moveName}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="evolution">
            <h3>Evolution Chain</h3>
            <div className="evolution-chain">
              {evolutionImages.map((poke, index) => (
                <div className="evo-card" key={index}>
                  <img src={poke.image} alt={poke.name} className="evo-img" />
                  <p>{poke.name}</p>
                  {index < evolutionImages.length - 1 && <span className="arrow">→</span>}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
