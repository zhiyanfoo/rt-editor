export const ActionType = {
  InputInsertion: "INPUT_INSERTION",
  InputDeletion: "INPUT_DELETION",
  GenerateNewDoc: "GENERATE_NEW_DOC",
  InsertCommands: 'INSERT_COMMANDS',
  GetCommands: 'GET_COMMANDS',
  SetDocumentTag: 'SET_DOCUMENT_TAG',
  AddSocket: 'ADD_SOCKET',
};

export const onInputInsertion = (char, pos, documentTag) => ({
  type: ActionType.InputInsertion,
  char,
  pos,
  documentTag,
});

export const onInputDeletion = (pos, documentTag) => ({
  type: ActionType.InputDeletion,
  pos,
  documentTag,
});

export const generateNewDoc = (history, newTab) => {
  return {
    type: ActionType.GenerateNewDoc,
    history,
    newTab,
  };
};

export const getCommands = (documentTag) => {
  return {
    type: ActionType.GetCommands,
    documentTag,
  };
}

export const addSocket = (documentTag) => {
  return {
    type: ActionType.AddSocket,
    documentTag,
  };
}

export const insertCommands = (commands) => {
  return {
    type: ActionType.InsertCommands,
    commands,
  };
}

export const localInsertion = (index, char) => {
  return {
    type: "LOCAL_INSERTION",
    index,
    char,
  }
}

export const localDeletion = (index) => {
  return {
    type: "LOCAL_DELETION",
    index: index,
  }
}

// export const setDocumentTag = (documentTag) => {
//   return {
//     type: ActionType.SetDocumentTag,
//     documentTag
//   }
// }
