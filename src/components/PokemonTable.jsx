import React from "react";
import styled from "@emotion/styled";
import PokemonRow from "./PokemonRow";
import useStore from "../Store";

const Table = styled.table`
  width: 80%;
  font-size: x-large;
  padding: 0.2rem;
`;

function PokemonTable() {
  const filter = useStore((state) => state.filter);
  const pokemon = useStore((state) => state.pokemon);
  const setSelectedPokemon = useStore((state) => state.setSelectedPokemon);

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
              onClick={(pokemon) => setSelectedPokemon(pokemon)}
            />
             /* Create Unique ID
                key={[pokemon.id, pokemon.name.english].join(':')} */
          ))}
      </tbody>
    </Table>
  );
}

export default PokemonTable;