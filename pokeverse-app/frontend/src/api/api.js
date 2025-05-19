import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/** Fetch Pokémon Data */
export const getPokemonData = async () => {
  try {
    const response = await axios.get(`${API_URL}/pokemon`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error.message);
    return [];
  }
};

/** Add Pokémon Data */
export const addPokemonData = async (pokemon) => {
  try {
    const response = await axios.post(`${API_URL}/pokemon`, pokemon);
    return response.data;
  } catch (error) {
    console.error("Error adding Pokémon:", error.message);
    throw error;
  }
};
