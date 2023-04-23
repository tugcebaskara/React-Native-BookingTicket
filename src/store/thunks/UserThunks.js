import { UserInfo } from "../system/ApiAction";

export function UserRegister(request) {
  return async (dispatch) => {
    dispatch(UserInfo(request));
    return request;
  };
}
