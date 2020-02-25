import React from 'react';
import { connect } from 'react-redux';
import Blog from './Blog';
import * as actions from './actions';
import { withRouter } from 'react-router';

const MapStateToProps = (state, { params }) => {
  return {
    blogPost: state.blogData,
    params,
  };
};

export default withRouter(
  connect(
    MapStateToProps,
    actions
  )(Blog)
);
