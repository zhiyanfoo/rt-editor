export const ActionType = {
  InputInsertion: "INPUT_INSERTION",
  InputDeletion: "INPUT_DELETION",
  GenerateNewDoc: "GENERATE_NEW_DOC",
  InsertCommands: 'INSERT_COMMANDS',
  GetCommands: 'GET_COMMANDS',
  SetDocumentTag: 'SET_DOCUMENT_TAG',
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

export const generateNewDoc = (history, newTab) => {
  console.log('action newTab')
  console.log(newTab)
  return {
    type: ActionType.GenerateNewDoc,
    history,
    newTab,
  };
};

export const getCommands = () => {
  return {
    type: ActionType.GetCommands,
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

export const setDocumentTag = (documentTag) => {
  return {
    type: ActionType.SetDocumentTag,
    documentTag
  }
}
