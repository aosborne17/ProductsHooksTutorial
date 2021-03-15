import { useEffect, useReducer } from "react";

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending":
      return { ...state, status: "pending" };
    case "resolved":
      return { ...state, status: "resolved", data: action.payload };
    case "rejected":
      return { ...state, status: "rejected", error: action.payload };
    default:
      throw new Error(`Unsupported type ${action.type}`);
  }
}

function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: "",
    data: null,
    error: null,
    ...initialState,
  });

  useEffect(() => {
    const promise = asyncCallback();

    if (!promise) {
      return;
    }
    promise
      .then(({ data }) => {
        dispatch({ type: "resolved", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "rejected", payload: err });
      });
  }, [asyncCallback]);

  return state;
}

export { useAsync };
