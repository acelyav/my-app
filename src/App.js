import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
// import styled from "@emotion/styled";

import "./App.css";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelect(pokemon)}
      >
        Select!
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "SP. Attack": PropTypes.number.isRequired,
    "SP. Defence": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

// const Title = styled.h1`
//   text-align: center;
// `;

// const TwoColumnLayout = styled.div`
//   display: "grid",
// `

// const Container = styled.div`
//   margin: "auto",
//   width: 800,
//   paddingTop: 1rem,
// `

// const input = styled.input`
//   width: 100%;
//   font-size: x-large;
//   padding: 0.2rem;
// `

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

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
      {selectedItem && <PokemonInfo {...selectedItem} />}
    </div>
  );
}

export default App;
