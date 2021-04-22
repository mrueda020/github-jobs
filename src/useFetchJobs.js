import { useEffect, useReducer } from "react";
import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        jobs: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });
  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: source.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((result) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: result.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      source.cancel();
    };
  }, [params, page]);
  return state;
};

export default useFetchJobs;
