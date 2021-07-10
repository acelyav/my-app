import React, { useContext } from "react";
import styled from "@emotion/styled";
import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

const Table = styled.table`
  width: 80%;
  font-size: x-large;
  padding: 0.2rem;
`;

function PokemonTable() {
  const { state: {filter, pokemon}, dispatch } = useContext(PokemonContext);
  return (
    <Table>
      <tbody>
        {pokemon
          .filter(({ name: { english } }) =>
            english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .slice(0, 10)
          .map((pokemon) => (
            <PokemonRow
              pokemon={pokemon}
              // key={pokemon.id}
              onClick={(pokemon) => dispatch({type: "SET_SELECTED_POKEMON", payload: pokemon})}
            />
             /* Create Unique ID
                key={[pokemon.id, pokemon.name.english].join(':')} */
          ))}
      </tbody>
    </Table>
  );
}

export default PokemonTable;