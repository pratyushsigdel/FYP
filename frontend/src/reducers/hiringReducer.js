import {
  ALL_HIRE_REQUEST_FAIL,
  ALL_HIRE_REQUEST_REQUEST,
  ALL_HIRE_REQUEST_SUCCESS,
  ADMIN_HIRE_REQUEST_FAIL,
  ADMIN_HIRE_REQUEST_REQUEST,
  ADMIN_HIRE_REQUEST_SUCCESS,
  USER_HIRE_REQUEST_FAIL,
  USER_HIRE_REQUEST_REQUEST,
  USER_HIRE_REQUEST_SUCCESS,
  UPDATE_HIRE_REQUEST_FAIL,
  UPDATE_HIRE_REQUEST_REQUEST,
  UPDATE_HIRE_REQUEST_SUCCESS,
  DELETE_HIRE_REQUEST_FAIL,
  DELETE_HIRE_REQUEST_REQUEST,
  DELETE_HIRE_REQUEST_SUCCESS,
  HIRE_REQUEST_DETAILS_REQUEST,
  HIRE_REQUEST_DETAILS_SUCCESS,
  HIRE_REQUEST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/hiringConstants";

export const hiringReducer = (state = { hiringRequests: [] }, action) => {
  switch (action.type) {
    case ALL_HIRE_REQUEST_REQUEST:
    case ADMIN_HIRE_REQUEST_REQUEST:
    case USER_HIRE_REQUEST_REQUEST:
    case UPDATE_HIRE_REQUEST_REQUEST:
    case DELETE_HIRE_REQUEST_REQUEST:
    case HIRE_REQUEST_DETAILS_REQUEST:
      return {
        loading: true,
        hiringRequests: [],
      };
    case ALL_HIRE_REQUEST_SUCCESS:
      return {
        loading: false,
        hiringRequests: action.payload.hiringRequests,
        //   hiringRequestsCount: action.payload.hiringRequestsCount,
        //   resultPerPage: action.payload.resultPerPage,
        //   filteredHiringRequestsCount: action.payload.filteredHiringRequestsCount,
      };
    case ADMIN_HIRE_REQUEST_SUCCESS:
    case USER_HIRE_REQUEST_SUCCESS:
      return {
        loading: false,
        hiringRequests: action.payload,
      };
    case UPDATE_HIRE_REQUEST_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_HIRE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case HIRE_REQUEST_DETAILS_SUCCESS:
      return {
        loading: false,
        hiringRequest: action.payload,
      };
    case ALL_HIRE_REQUEST_FAIL:
    case ADMIN_HIRE_REQUEST_FAIL:
    case USER_HIRE_REQUEST_FAIL:
    case UPDATE_HIRE_REQUEST_FAIL:
    case DELETE_HIRE_REQUEST_FAIL:
    case HIRE_REQUEST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
