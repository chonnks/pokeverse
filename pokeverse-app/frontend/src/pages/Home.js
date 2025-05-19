import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "../img/logo.png";
import { getPokemonData, addPokemonData } from "../api/api";
import { Swiper, SwiperSlide } from "swiper/react"; //react libary for slider in evolution chain
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

import { ToastContainer, toast } from "react-toastify"; //react library for errors and success notifications
import "react-toastify/dist/ReactToastify.css";

// Stating declarations
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionDetails, setEvolutionDetails] = useState([]);
  const [moveTypes, setMoveTypes] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const data = await getPokemonData();
      setPokemonList(data);
    } catch (err) {
      console.error("Error fetching Pokémon data:", err.message);
      setError("Failed to fetch Pokémon data.");
    }
  };

  // handleSearch function to fetch Pokémon data
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setPokemonData(null);
    setEvolutionDetails([]);
    setMoveTypes({});

    // Fetch Pokémon data from the API
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      if (!res.ok){
        toast.warn("Pokémon not found.");
        throw new Error("Pokémon not found");
      }
      
      // Fetch Pokémon data
      const data = await res.json();


      // Fetch species data to get Pokédex entry and evolution chain
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      const pokedexEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      )?.flavor_text.replace(/\f/g, " ") || "No Pokédex entry available.";

      // Fetch evolution chain data
      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      const evoChain = [];
      let evoStage = evoData.chain;

      while (evoStage) {
        evoChain.push({ name: evoStage.species.name, level: null });

        evoStage.evolves_to.forEach((evo) => {
          evoChain.push({
            name: evo.species.name,
            level: evo.evolution_details[0]?.min_level || "Unknown",
          });
        });

        evoStage = evoStage.evolves_to[0];
      }

      const uniqueEvoChain = evoChain.filter(
        (evo, index, self) => index === self.findIndex((e) => e.name === evo.name)
      );

      // Fetch Pokémon images for evolution chain
      const evoDetails = await Promise.all(
        uniqueEvoChain.map(async (evo) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.name}`);
          const pokeData = await res.json();
          const image =
            pokeData.sprites.other["official-artwork"].front_default ||
            pokeData.sprites.front_default ||
            placeholderImage;

          return { name: capitalize(evo.name), image, level: evo.level };
        })
      );

      setEvolutionDetails(evoDetails);

      // Fetch level-up moves and their types
      const moveTypesMap = {};
      const levelUpMoves = data.moves
        .map((m) => {
          const levelData = m.version_group_details.find(
            (v) => v.move_learn_method.name === "level-up"
          );
          return { name: m.move.name, level: levelData?.level_learned_at || Infinity };
        })
        .filter((m) => m.level !== Infinity)
        .sort((a, b) => a.level - b.level);
      
      // Fetch move types
      await Promise.all(
        levelUpMoves.map(async (move) => {
          const res = await fetch(`https://pokeapi.co/api/v2/move/${move.name}`);
          const moveData = await res.json();
          moveTypesMap[move.name] = moveData.type.name;
        })
      );

      // Set Pokémon sprite
      const sprite = data.sprites.other["official-artwork"].front_default || placeholderImage;

      setPokemonData({ ...data, sprite, pokedexEntry, levelUpMoves });
      setMoveTypes(moveTypesMap);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // handleAddPokemon function to add Pokémon data
  const handleAddPokemon = async (e) => {
    e.preventDefault();
  
    if (!name || !level || !type || !description) {
      setError("All fields are required.");
      return;
    }
  
    const newPokemon = {
      name,
      level: parseInt(level),
      type,
      description,
    };
  
    try {
      await addPokemonData(newPokemon);
      fetchPokemonData();  // Refresh the Pokémon list after adding
      setName("");
      setLevel("");
      setType("");
      setDescription("");
      toast.success("Pokémon added successfully!");
    } catch (err) {
      console.error("Error adding Pokémon:", err.message);
      setError("Failed to add Pokémon.");
      toast.error("Failed to add Pokémon.");
    }
  };
  
  
  return (
    <div className="app">
      <div className="home-navbar-logo">
        <img src={logo} alt="Pokeverse Logo" className="home-logo-img" />
      </div>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading Pokémon data...</p>}
      {error && <p className="error">{error}</p>}

      {pokemonData && (
        <div className="pokemon-card">
          <div className="top-section">
            <img src={pokemonData.sprite} alt={pokemonData.name} />
            <div className="info">
              <h2>{capitalize(pokemonData.name)}</h2>
              <p>{pokemonData.pokedexEntry}</p>
            </div>
          </div>

          <div className="moves">
            <h3>Moves</h3>
            <ul>
              {pokemonData.levelUpMoves.map((move, index) => (
                <li key={index}>
                  Lv. {move.level} - <span className={`type ${moveTypes[move.name]}`}>
                    {capitalize(moveTypes[move.name])}
                  </span> {capitalize(move.name.replace(/-/g, " "))}
                </li>
              ))}
            </ul>
          </div>
              
          {/* slider with evolution chain */}  
          <div className="evolution">
            <h3>Evolution Chain</h3>

            {evolutionDetails.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                className="evolution-slider"
              >
                {evolutionDetails.map((poke, index) => (
                  <SwiperSlide key={index}>
                    <div className="evo-card">
                      <img src={poke.image} alt={poke.name} className="evo-img" />
                      <p>{poke.name}</p>
                      {poke.level && <p>Level: {poke.level}</p>}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No Evolution Data Available</p>
            )}
          </div>
        </div>
      )}

      {/* Add Pokémon Form */}
      <div className="add-pokemon-form">
        <h2>Add Pokémon</h2>
        <form onSubmit={handleAddPokemon}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
          <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Pokémon</button>
        </form>
      </div>

      {/* Pokémon List */}
      <div className="pokemon-list">
        <h2>Pokémon List</h2>
        <ul>
          {pokemonList.map((poke, index) => (
            <li key={index}>{poke.name} - Lv. {poke.level} - {poke.type}</li>
          ))}
        </ul> 
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
  
};

export default Home;
