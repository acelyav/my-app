import React from "react";
import styled from "@emotion/styled";

import useStore from "../Store";

const Input = styled.input`
  width: 50%;
  font-size: x-large;
  padding: 0.2rem;
`;

const PokemonFilter = () => {
  const filter = useStore ((state) => state.filter);
  const setFilter = useStore ((state) => state. setFilter);
  
  return (
    <Input
      type="text"
      value={filter}
      onChange={(evt) => setFilter(evt.target.value)}
    />
  );
};

export default PokemonFilter;