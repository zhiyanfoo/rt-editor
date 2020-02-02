export const ActionType = {
  InputInsertion: "INPUT_INSERTION",
  InputDeletion: "INPUT_DELETION"
};

export const onInputInsertion = (char, pos) => ({
  type: ActionType.InputInsertion,
  char,
  pos
});

export const onInputDeletion = pos => ({
  type: ActionType.InputDeletion,
  pos
});
