import React, { useEffect } from "react";
import { connect } from "react-redux";
import { generateNewDoc } from "../../actions";
import { Redirect } from "react-router-dom";
import { getDocumentUrl } from "../../utils/locationhandler";
import { wrapper } from "../NewDocWrapper";

const redirectNewDoc = ({ documentTag }) => {
  return (
    <div>
      {documentTag ? (
        <Redirect to={getDocumentUrl(documentTag)} />
      ) : (
        <div>Generating document ...</div>
      )}
    </div>
  );
};

const WrappedComponent = wrapper(redirectNewDoc);

const RedirectNewDoc = ({ generateNewDoc, documentTag }) => {
  useEffect(() => {
    generateNewDoc();
  }, [generateNewDoc]);

  return <WrappedComponent documentTag={documentTag} />;
};

const mapDispatchToProps = {
  generateNewDoc
};

const mapStateToProps = ({
  editor: { documentTag, ...editorState },
  ...state
}) => {
  console.log("mapStateToProps");
  console.log(state);
  console.log(documentTag);
  return { documentTag };
};

const _RedirectNewDoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectNewDoc);

export { _RedirectNewDoc as RedirectNewDoc };
