import React, { useContext } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";

const Input = styled.input`
  width: 77%;
  font-size: x-large;
  padding: 0.2rem;
`;

const PokemonFilter = () => {
  const filter = useSelector(({filter}) => filter);
  const dispatch = useDispatch();

  return (
    <Input
      type="text"
      value={filter}
      onChange={(evt) => dispatch({type: "SET_FILTER", payload: evt.target.value})}
    />
  );
};

export default PokemonFilter;