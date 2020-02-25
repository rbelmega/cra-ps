import { connect } from 'react-redux';
import Body from './Body';
import * as actions from './actions';

const MapStateToProps = state => {
  return {
    bio: state.bioData.bio,
    activities: state.bioData.activities,
  };
};

export default connect(
  MapStateToProps,
  actions
)(Body);
