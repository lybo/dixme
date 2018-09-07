import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers';
import rootEpic from '../epics/';

const epicMiddleware = createEpicMiddleware(rootEpic);
const finalCreateStore = compose(
  applyMiddleware(
    epicMiddleware,
  ),
)(createStore);

export default finalCreateStore(rootReducer);
