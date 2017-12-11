import { connect } from 'react-redux'
import App from '../components/App/';

export default connect(
    (state) => {
        return {
            vocabularies: state.vocabularies
        };
    },
    (dispatch) => {
        return {};
    }
)(App);
