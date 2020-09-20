import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { wrapper } from "../NewDocWrapper";

const generateNewDoc = () => (
  <Link className="btn btn-default" to="/new">
    Create New Document
  </Link>
);

const WrappedComponent = wrapper(generateNewDoc);

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

const GenerateNewDoc_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedComponent);

export { GenerateNewDoc_ as GenerateNewDoc };
