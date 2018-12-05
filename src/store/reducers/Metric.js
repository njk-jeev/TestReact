import * as actions from "../actions";

const initialState = {
  loading: true,
  data: []
};

const metricDataReceived = (state, action) => {
  return { ...state, loading: false, data: action.data };
};

const handlers = {
  [actions.METRIC_DATA_RECEIVED]: metricDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
