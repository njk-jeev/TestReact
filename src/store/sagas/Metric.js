import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

/*
  1. The metric service returns the metric data for a drone.
  2. We then use that that drone data to show the report.

  This process is pretty well defined here with a saga.

  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/

function* watchMetricDataReceived(action) {
  const { id } = action;
  const { error, data } = yield call(API.getMetricData, id);
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.METRIC_DATA_RECEIVED, data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_METRIC_DATA, watchMetricDataReceived)
  ]);
}

export default [watchAppLoad];
