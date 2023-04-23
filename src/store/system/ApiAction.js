import ACTION_TYPES from "./ActionTypes";

export const UserInfo = (data) => ({
  type: ACTION_TYPES.USER_INFO,
  payload: data,
});

export const IsUserActive = (data) => ({
  type: ACTION_TYPES.IS_USER_ACTIVE,
  payload: data,
});
export const CitiesInfo = (data) => ({
  type: ACTION_TYPES.CITIES_INFO,
  payload: data,
});
export const ToggleLoader = (data) => ({
  type: ACTION_TYPES.TOGGLE_LOADER,
  payload: data,
});

export const HideLoader = (data) => ({
  type: ACTION_TYPES.HIDE_LOADER,
  payload: data,
});

export const TicketData = (data) => ({
  type: ACTION_TYPES.TICKET_DATA,
  payload: data,
});

export const SeatList = (data) => ({
  type: ACTION_TYPES.SEAT_LIST,
  payload: data,
});

export const ADDSeatList = (data) => ({
  type: ACTION_TYPES.ADD_SEAT_LIST,
  payload: data,
});

export const RemoveSeatList = (data) => ({
  type: ACTION_TYPES.ADD_SEAT_LIST,
  payload: data,
});
