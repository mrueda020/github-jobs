import { useEffect, useReducer } from "react";
import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
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
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const CancelToken1 = axios.CancelToken;
  const source1 = CancelToken1.source();
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });
  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: source1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((result) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: result.data } });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      });
    const CancelToken2 = axios.CancelToken;
    const source2 = CancelToken2.source();
    axios
      .get(BASE_URL, {
        cancelToken: source2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((result) => {
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: result.data.length !== 0 },
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: error } });
      });

    return () => {
      source1.cancel();
      source2.cancel();
    };
  }, [params, page]);
  return state;
};

export default useFetchJobs;
