export const tileIsOccupied = (x, y, boardState) => {
  const piece = boardState.find((p) => p.x === x && p.y === y);
  // if there is no piece in the specific tile it returns true but if there is it return true
  return piece !== undefined;
};

export const tileIsOccupiedByOpponent = (x, y, boardState, team) => {
  const piece = boardState.find(
    (p) => p.x === x && p.y === y && p.team !== team
  );
  return piece !== undefined;
};
