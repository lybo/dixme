import { connect } from 'react-redux';
import Vocabularies from '../components/Vocabularies/';

export default connect(
  (state) => {
    return {
      vocabularies: state.vocabularies
    };
  },
  (dispatch) => {
    return {
    };
  }
)(Vocabularies);
