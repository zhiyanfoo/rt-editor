import { crdtTextToString } from "./crdt";

export const initialState = { crdtText: [] }

export const selectors = {
  getText: state => crdtTextToString(state.crdtText)
}

const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;


export const insertCommandsReducer = (state = {}, action) => {
  const commands = action.commands
  const parsedCommands = commands.map(JSON.parse)
  return parsedCommands.reduce(editor, state)
}

export const localInsertionReducer = (state = {}, action) => {
  const crdtText = state.crdtText;
  if (crdtText === undefined)
    return initialState
  const index = action.index;
  const char = action.char;
  const newStruct = [...crdtText.slice(0, index), char, ...crdtText.slice(index)];
  return { crdtText: newStruct };
};

export const localDeletionReducer = (state = {}, action) => {
  const crdtText = state.crdtText;
  if (crdtText === undefined)
    return initialState
  const index = action.index;
  const newCrdtText = [...crdtText.slice(0, index), ...crdtText.slice(index + 1)];
  return { crdtText: newCrdtText };
};

export const remoteInsertionReducer = (state = {}, action) => {
  const char = action.char;
  const crdtText = state.crdtText;
  if (crdtText === undefined)
    return initialState
  const [, index] = binarySearch(crdtText, compare, char);
  const newCrdtText = [...crdtText.slice(0, index), char, ...crdtText.slice(index)];
  return { crdtText: newCrdtText };
};

export const remoteDeletionReducer = (state = {}, action) => {
  const char = action.char;
  const crdtText = state.crdtText;
  if (crdtText === undefined)
    return initialState
  const [found, index] = binarySearch(crdtText, compare, char);
  if (!found) {
    console.warn("Not found");
    return { crdtText };
  }

  const newCrdtText = [...crdtText.slice(0, index), ...crdtText.slice(index + 1)];
  return { crdtText: newCrdtText };
};

const setDocumentTagReducer = (state = {}, action) => {
  return {...state, documentTag: action.documentTag}
}

export const compare = (c1, c2) => {
  const pos1 = c1.position;
  const pos2 = c2.position;

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
  if (r < 0) {
    return binarySearchHelper(list, compare, target, half + 1, max);
  } else if (r > 0) {
    return binarySearchHelper(list, compare, target, min, half - 1);
  }

  return [true, half];
};

export const editor = createReducer(
  initialState,
  {
    LOCAL_INSERTION: localInsertionReducer,
    LOCAL_DELETION: localDeletionReducer,
    BROADCAST_INSERT: remoteInsertionReducer,
    BROADCAST_DELETE: remoteDeletionReducer,
    INSERT_COMMANDS: insertCommandsReducer,
    SET_DOCUMENT_TAG: setDocumentTagReducer
  }
);
