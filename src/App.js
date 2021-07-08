import React from "react";
import PropTypes from "prop-types";

import "./App.css";
import pokemon from "./pokemon.json";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
};

function App() {
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <div>
        <input value={filter} onChange={(evn) => filterSet(evn.target.value)} />
      </div>
      <div
        style={{
          display: "grid",
        }}
      >
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) =>
                pokemon.name.english
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
              .slice(0, 20)
              .map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  key={pokemon.id}
                  onSelect={(pokemon) => selectedItemSet(pokemon)}
                />
                /* Create Unique ID
                key={[pokemon.id, pokemon.name.english].join(':')} */
              ))}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <div>
          <h1>{selectedItem.name.english}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
