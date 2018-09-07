import { connect } from 'react-redux';
import Notification from '../components/Notification';

export default connect(
  (state, ownProps) => {
    return {
      requests: JSON.parse(JSON.stringify(state.app.requests)),
    };
  },
  (dispatch, ownProps) => ({}),
)(Notification);
