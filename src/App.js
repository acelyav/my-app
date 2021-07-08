import React from "react";
import "./App.css";
import pokemon from "./pokemon.json";

const PokemonRow = ({ pokemon }) => (
  <tr
    // key={[pokemon.id, pokemon.name.english].join(':')} create unique id
    key={pokemon.id}
  >
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

function App() {
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <table width="100%">
        <thead>
          <th>Name</th>
          <th>Type</th>
        </thead>
        <tbody>
          {pokemon.slice(0, 20).map((pokemon) => (
            <PokemonRow pokemon={pokemon} key={pokemon.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
