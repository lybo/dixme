import * as api from '../services/index';
import * as actions from '../actions/game';
import * as types from '../constants/game';
import { Observable } from 'rxjs/Observable';

// REQUEST_POPULATE_GAME_ANSWERS_FROM_LOCAL
export const requestPopulateGameAnswersFromLocal = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_GAME_ANSWERS_FROM_LOCAL)
        .map(action => action.payload)
        .flatMap(payload =>
            // Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.fromPromise(api.getGame())
                    .flatMap(data =>
                        // Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateGameAnswersFromLocal(data)),
                        )
                    )
            )
        );
};
