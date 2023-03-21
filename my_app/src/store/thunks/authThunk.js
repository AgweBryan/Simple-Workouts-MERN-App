import { authActions } from "../slices/authSlice";
import { formActions } from "../slices/formSlice";

export const signupUser = (user) => async (dispatch) => {
  dispatch(authActions.setIsLoading(true));

  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  if (response.ok) {
    // save user to local storage
    localStorage.setItem("user", JSON.stringify(json));
    dispatch(authActions.setUser(json));
    return;
  }
  dispatch(authActions.setError(json.error));
  dispatch(authActions.setIsLoading(false));
  setTimeout(() => {
    dispatch(authActions.setError(""));
  }, 3000);
  clearTimeout();
};

export const loginUser = (cred) => async (dispatch) => {
  dispatch(authActions.setIsLoading(true));

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(cred),
    headers: { "Content-Type": "application/json" },
  });
  const json = await response.json();
  if (response.ok) {
    // save user to local storage
    localStorage.setItem("user", JSON.stringify(json));
    dispatch(authActions.setUser(json));
    return;
  }
  dispatch(authActions.setError(json.error));
  dispatch(authActions.setIsLoading(false));
  setTimeout(() => {
    dispatch(authActions.setError(""));
  }, 3000);
  clearTimeout();
};
