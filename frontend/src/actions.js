import seedrandom from "seedrandom";

export const localChange = (editor, data, value) => {
  return {
    type: "LOCAL_CHANGE",
    editor,
    data,
    value
  };
};

export const onChange = (editor, data, value) => {
  return {
    type: "ON_CHANGE",
    editor,
    data,
    value
  };
};

export const onBeforeChange = (editor, data, value) => {
  const rng = new seedrandom(Math.random().toString());
  return {
    type: "ON_BEFORE_CHANGE",
    editor,
    data,
    value,
    rng
  };
};
