import { Observable } from 'rxjs/Observable'
import * as appActions from '../actions/app'
import * as request from '../constants/request';
import * as auth from '../actions/auth';

export function errorHandler(requestName) {
  return err => Observable.concat(
    Observable.of(appActions.setRequest({
      requestName,
      requestData: {
        status: request.DONE,
        error: err.status,
      },
    })),
    Observable.if(
      () => err.status === 401,
      Observable.of(auth.logoutSuccess()),
    ),
    Observable.of(appActions.setRequest({
      requestName,
      requestData: {
        status: request.IDLE,
        error: '',
      },
    })),
  );
}
