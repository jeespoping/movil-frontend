import { loginByToken, refreshAccessToken } from "../api/auth";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/authReducer";
import { setAccesToken, setRefreshToken } from "../utils/token";

export const reLogin = (refreshToken) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await refreshAccessToken(refreshToken);
    dispatch(loginSuccess(response));
    setAccesToken(response.accessToken);
    setRefreshToken(response.refresh);
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    return null;
  }
};

export const getMe = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await loginByToken();
    dispatch(
      loginSuccess({
        user: response,
      })
    );
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    return null;
  }
};
