import { useSelector } from "react-redux";
import ACTION_TYPES from "./ActionTypes";

const initialState = {
  loading: false, //loading is a new state
  user: [], //user is a new state
  isUserActive: false, //isUserActive is a new state
  ticketData: {}, //ticketData is a new state
  seatList: [], //seatList is a new state
};

const SystemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION_TYPES.IS_USER_ACTIVE:
      return {
        ...state,
        isUserActive: action.payload,
      };
    case ACTION_TYPES.HIDE_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_TYPES.TOGGLE_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_TYPES.TICKET_DATA:
      return {
        ...state,
        ticketData: action.payload,
      };
    case ACTION_TYPES.SEAT_LIST:
      return {
        ...state,
        seatList: action.payload,
      };
    case ACTION_TYPES.ADD_SEAT_LIST:
      return {
        ...state,
        seatList: [...state.seatList, action.payload],
      };
    case ACTION_TYPES.REMOVE_SEAT_LIST:
      const index = state.seatList.findIndex(
        (seat) => seat.id === action.payload
      );
      const newSeatList = [...state.seatList];
      newSeatList.splice(index, 1);

      return {
        ...state,
        seatList: newSeatList,
      };

    default:
      return state;
  }
};

export default SystemReducer;
