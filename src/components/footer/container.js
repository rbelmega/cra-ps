import * as actions from './actions';
import { connect } from 'react-redux';
import Footer from './Footer';

const MapStateToProps = state => {
  return {
    posts: state.postsData,
  };
};

export default connect(MapStateToProps, actions)(Footer);
