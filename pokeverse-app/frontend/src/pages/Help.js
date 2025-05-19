import React from "react";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-page">
      <h1>Help and Support</h1>
      
      <section className="help-section">
        <h2>Common Issues and Solutions</h2>
        <div className="help-item">
          <h3>1. Pokémon Not Found</h3>
          <p>
            If you search for a Pokémon and do not receive any data, ensure that:
          </p>
          <ul>
            <li>The Pokémon name is spelled correctly.</li>
            <li>You are connected to the internet.</li>
            <li>The PokéAPI server is operational. Check the status at <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">pokeapi.co</a>.</li>
          </ul>
        </div>

        <div className="help-item">
          <h3>2. Data Not Displaying Correctly</h3>
          <p>
            If data is missing or incomplete, try the following:
          </p>
          <ul>
            <li>Refresh the page.</li>
            <li>Clear browser cache and try again.</li>
            <li>Ensure that the Pokémon name is correct and exists in the database.</li>
          </ul>
        </div>

        <div className="help-item">
          <h3>3. Images Not Loading</h3>
          <p>
            If Pokémon images are not loading:
          </p>
          <ul>
            <li>Check your internet connection.</li>
            <li>Ensure that the image URL is accessible.</li>
            <li>Inspect the console for error messages related to image loading.</li>
          </ul>
        </div>
      </section>

      <section className="help-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <div className="faq-item">
          <h3>How do I search for a Pokémon?</h3>
          <p>
            Enter the name of the Pokémon in the search bar on the Home page. Press "Search" to view its information.
          </p>
        </div>

        <div className="faq-item">
          <h3>Can I search by Pokémon ID or number?</h3>
          <p>
            Yes. You can search by the official Pokédex number or the Pokémon name.
          </p>
        </div>

        <div className="faq-item">
          <h3>How do I report a bug or issue?</h3>
          <p>
            If you encounter a bug or have feedback, please contact us via the information provided in the "Contact Us" section below.
          </p>
        </div>
      </section>

      <section className="help-section">
        <h2>Contact Us</h2>
        <p>If you need further assistance, feel free to reach out through email or checking the repository:</p>
        <ul>
          <li>Email: brucereyes145@gmail.com</li>
          <li>GitHub Issues: <a href="https://github.com/chonnks/pokeverse" target="_blank" rel="noopener noreferrer">Pokeverse Repository</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
