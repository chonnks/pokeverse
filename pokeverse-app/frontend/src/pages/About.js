import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Pokeverse</h1>
      
      <section className="about-section">
        <h2>What is Pokeverse?</h2>
        <p>
        PokéVerse is a comprehensive pokemon information web app. In this app, the user can search for any pokemon and find information about them like their stats, typing, moves, and evolutions. The app also allows users to add pokemon using the Supabase database. The frontend was deployed on Vercel and the backend was deployed on Render with the Supabase database connection.

        </p>
      </section>

      <section className="about-section">
        <h2>Features of Pokeverse</h2>
        <ul>
          <li>Search for any Pokémon by name</li>
          <li>View base stats with dynamic stat bars</li>
          <li>View moves and their corresponding types and levels in which they learn them</li>
          <li>Explore evolution chains with clickable Pokémon images</li>
          <li>Get comprehensive Pokédex entries</li>
          <li>Custom Pokemon entry</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>How to Use Pokeverse</h2>
        <p>
          To use Pokeverse, enter the name of a Pokémon in the search bar on the Home page. 
          Once the Pokémon is found, its detailed information will be displayed, including:
        </p>
        <ul>
          <li>Base stats with minimum and maximum values at level 100</li>
          <li>Type badges representing its elemental types</li>
          <li>List of moves with associated levels and move types</li>
          <li>Evolution chain with clickable Pokémon images</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Data Sources</h2>
        <p>
          Pokeverse leverages the <a href="https://pokeapi.co/ " target="_blank" rel="noopener noreferrer">PokéAPI</a> 
           to retrieve all data regarding Pokémon, their moves, stats, and evolutions. 
          The data is fetched dynamically, ensuring that the information is always up-to-date.
        </p>
        <p>
          The application also uses <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer">Supabase</a> 
          for storing user-generated Pokémon entries, allowing users to add and manage their own Pokémon data.
        </p>
      </section>

      <section className="about-section">
        <h2>Technologies Used</h2>
        <ul>
          <li>React.js for the user interface</li>
          <li>React Router for navigation between pages</li>
          <li>Axios for API requests</li>
          <li>Supabase for database management</li>
          <li>Vercel for frontend deployment</li>
          <li>Render for backend deployment</li>
          <li>Node.js for server-side logic</li>
          <li>Express.js for building the backend API</li>
          <li>PostgreSQL for the database</li>
          <li>HTML for structure and semantics</li>
          <li>CSS for styling and layout</li>
          <li>PokéAPI for data retrieval</li>
          <li>JavaScript for data manipulation and logic</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Future Enhancements</h2>
        <p>
          Future updates of Pokeverse will include:
        </p>
        <ul>
          <li>Advanced search filters (by type, region, etc.)</li>
          <li>User authentication using Supabase</li>
          <li>Pokémon comparison tool to compare stats</li>
          <li>Interactive battle simulator</li>
          <li>Dynamic team builder with Pokémon suggestions</li>

        </ul>
      </section>

      <section className="about-section">
        <h2>Contact and Support</h2>
        <p>
          If you encounter any issues or have suggestions for improvement, 
          feel free to contact us at: 
        </p>
        <ul>
          <li>Email: brucereyes145@gmail.com</li>
          <li>GitHub: <a href="https://github.com/chonnks/pokeverse" target="_blank" rel="noopener noreferrer">Pokeverse Repository</a></li>
        </ul>
      </section>
    </div>
  );
};

export default About;
