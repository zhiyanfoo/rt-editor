import { structToText } from "./crdt";

export const selectors = {
  getText: state => structToText(state.struct)
}

export const localInsertionReducer = (state, action) => {
  const struct = state.struct;
  const index = action.index;
  const char = action.char;
  const newStruct = [...struct.slice(0, index), char, ...struct.slice(index)];
  return { struct: newStruct };
};

export const localDeletionReducer = (state, action) => {
  const struct = state.struct;
  const index = action.index;
  const newStruct = [...struct.slice(0, index), ...struct.slice(index + 1)];
  return { struct: newStruct };
};

export const remoteInsertionReducer = (state, action) => {
  const char = action.char;
  const struct = state.struct;
  const [, index] = binarySearch(struct, compare, char);
  const newStruct = [...struct.slice(0, index), char, ...struct.slice(index)];
  return { struct: newStruct };
};

export const remoteDeletionReducer = (state, action) => {
  console.log("hello");
  const char = action.char;
  const struct = state.struct;
  console.log("char", action.char);
  const [found, index] = binarySearch(struct, compare, char);
  if (!found) {
    console.warn("Not found");
    return { struct };
  }

  const newStruct = [...struct.slice(0, index), ...struct.slice(index + 1)];
  return { struct: newStruct };
};

export const compare = (c1, c2) => {
  const pos1 = c1.position;
  const pos2 = c2.position;
  console.log("tf", pos2);

  for (let i = 0; i < Math.min(pos1.length, pos2.length); i++) {
    const x = pos1[i];
    const y = pos2[i];
    if (x.digit < y.digit) {
      return -1;
    } else if (x.digit > y.digit) {
      return 1;
    }

    if (x.username < y.username) {
      return -1;
    } else if (x.username > y.username) {
      return 1;
    }
  }

  if (pos1.length < pos2.length) {
    return -1;
  } else if (pos1.length > pos2.length) {
    return 1;
  } else {
    return 0;
  }
};

export const binarySearch = (list, compare, target) => {
  if (list.length === 0) {
    return [false, 0];
  }
  return binarySearchHelper(list, compare, target, 0, list.length - 1);
};

export const binarySearchHelper = (list, compare, target, min, max) => {
  console.log(`step ${min} ${max}`);
  // if (min > max) {
  //   return [false, min]
  // }
  if (min >= max) {
    const r = compare(list[min], target);
    if (r === 0) {
      return [true, min];
    } else if (r < 0) {
      return [false, min + 1];
    } else {
      return [false, min];
    }
  }

  const half = Math.floor((min + max) / 2);
  const midway = list[half];
  const r = compare(midway, target);
  // if (max === 13) {
  //   console.log(`half ${half}`)
  //   console.log(midway)
  //   console.log(list[half - 1])
  // }
  if (r < 0) {
    return binarySearchHelper(list, compare, target, half + 1, max);
  } else if (r > 0) {
    return binarySearchHelper(list, compare, target, min, half - 1);
  }

  return [true, half];
};
