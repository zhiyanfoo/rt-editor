export const onInputInsertion = (char, pos) => ({
  type: "INPUT",
  origin: "+insert",
  char,
  pos
});

export const onInputDeletion = pos => ({
  type: "INPUT",
  origin: "+delete",
  pos
});
