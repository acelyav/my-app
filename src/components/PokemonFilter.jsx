import React, { useContext } from "react";
import styled from "@emotion/styled";

import PokemonContext from "../PokemonContext";

const Input = styled.input`
  width: 50%;
  font-size: x-large;
  padding: 0.2rem;
`;

const PokemonFilter = () => {
  const { state, dispatch} = useContext(PokemonContext);

  return (
    <Input
      type="text"
      value={state.filter}
      onChange={(evt) => dispatch({type: 'SET_FILTER', payload: evt.target.value})}
    />
  );
};

export default PokemonFilter;