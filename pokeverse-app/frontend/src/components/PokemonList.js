import React, { useEffect, useState } from "react";
import { getPokemonData, addPokemonData } from "../api/api";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  // Fetch Pokémon data when the component mounts
  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    const data = await getPokemonData();
    setPokemonList(data);
  };

  const handleAddPokemon = async (e) => {
    e.preventDefault();

    if (!name || !level || !type || !description) {
      alert("All fields are required!");
      return;
    }

    const newPokemon = {
      name,
      level: parseInt(level),
      type,
      description,
    };

    await addPokemonData(newPokemon);
    fetchPokemonData();  // Refresh the list
    setName("");
    setLevel("");
    setType("");
    setDescription("");
  };

  return (
    <div className="pokemon-list">
      <h2>Add Pokémon</h2>
      <form onSubmit={handleAddPokemon} className="add-pokemon-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Pokémon</button>
      </form>

      <h2>Pokémon List</h2>
      <ul>
        {pokemonList.length > 0 ? (
          pokemonList.map((poke) => (
            <li key={poke.id}>
              <strong>{poke.name}</strong> - Lv. {poke.level} - {poke.type}  
              <br />
              {poke.description}
            </li>
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </ul>
    </div>
  );
};

export default PokemonList;
