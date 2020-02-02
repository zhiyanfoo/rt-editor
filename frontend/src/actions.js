export const ActionType = {
  InputInsertion: "INPUT_INSERTION",
  InputDeletion: "INPUT_DELETION",
  GenerateDocumentHttps: "GENERATE_DOCUMENT_HTTPS",
  GoToDocumentPage: "GO_TO_DOCUMENT_PAGE",
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

export const generateNewDoc = () => {
  return {
    type: ActionType.GenerateDocumentHttps
  };
};

export const goToDocumentPage = (document_tag) => {
  return {
    type :ActionType.GoToDocumentPage,
    document_tag,
  };
}
