// slices
import containerApp from './app/slices/AppSlice';
/* PLOP_INJECT_IMPORT */

/*every slice name (key and createSlice name) starts with the prefix of the current app: "container",
so it never collides with the slices injected by the remote apps ("inner", "secondInner")
and its action types are unique too (e.g. containerApp/updateTestString)*/
export const reducerSlices = {
  containerApp,
  /* PLOP_INJECT_REDUCER_SLICE */
};
