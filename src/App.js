import React from "react";
import PropTypes from "prop-types";
import { Button, CssBaseline } from "@material-ui/core";
import styled from "@emotion/styled";

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
        More Information
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

const Title = styled.h1`
  text-align: left;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const PageContainer = styled.div`
  margin: 1rem;
  width: 800;
  paddingtop: 1rem;
`;

const Input = styled.input`
  width: 50%;
  font-size: x-large;
  padding: 0.2rem;
`;

const Table = styled.table`
  width: 80%;
  font-size: x-large;
  padding: 0.2rem;
`;

const Header = styled.th`
  text-align: left;
  font-size: x-large;
`;

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PageContainer>
      <CssBaseline />
      <Title>Pokemon Search</Title>
      <div>
        <Input value={filter} onChange={(evn) => filterSet(evn.target.value)} />
      </div>
      <TwoColumnLayout>
        <Table>
          <thead>
            <tr>
              <Header>Name</Header>
              <Header>Type</Header>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) =>
                pokemon.name.english
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
              .slice(0, 10)
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
        </Table>
      </TwoColumnLayout>
      {selectedItem && <PokemonInfo {...selectedItem} />}
    </PageContainer>
  );
}

export default App;
