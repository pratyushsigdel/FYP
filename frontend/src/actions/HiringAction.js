import axios from "axios";
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

// Get all hire requests
export const getAllHireRequests = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_HIRE_REQUEST_REQUEST });

    const { data } = await axios.get("/api/v1/hirerequest");

    dispatch({
      type: ALL_HIRE_REQUEST_SUCCESS,
      payload: data.hireRequestData,
    });
  } catch (error) {
    dispatch({
      type: ALL_HIRE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// POST all hire requests
export const posthiringrequest =
  (productID, startDate, endDate, images, status, email) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_HIRE_REQUEST_REQUEST });

      const { data } = await axios.post("/api/v1/hirerequest", {
        productId: productID,
        startDate: startDate,
        email: email,
        endDate: endDate,
        images: images,
        status: status,
      });

      dispatch({
        type: ALL_HIRE_REQUEST_SUCCESS,
        payload: data.hireRequestData,
      });
    } catch (error) {
      dispatch({
        type: ALL_HIRE_REQUEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get admin hire requests
export const getAdminHireRequests = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_HIRE_REQUEST_REQUEST });

    const { data } = await axios.get("/api/v1/admin/hirerequests");

    dispatch({
      type: ADMIN_HIRE_REQUEST_SUCCESS,
      payload: data.hireRequests,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_HIRE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User's hire request
export const UserHireRequest = () => async (dispatch) => {
  try {
    dispatch({ type: USER_HIRE_REQUEST_REQUEST });

    const { data } = await axios.get("/api/v1/user/hirerequests");

    dispatch({
      type: USER_HIRE_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_HIRE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update hire request Status
export const updateHireRequest = (id, hireRequestData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HIRE_REQUEST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/hirerequest/${id}`,
      hireRequestData,
      config
    );

    dispatch({
      type: UPDATE_HIRE_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_HIRE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Hire Details -- Admin
export const gethireDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: HIRE_REQUEST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/hirerequest/${id}`);

    dispatch({
      type: HIRE_REQUEST_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: HIRE_REQUEST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete hire Request --- Admin

export const deleteHireRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HIRE_REQUEST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/hirerequest/${id}`);

    dispatch({
      type: DELETE_HIRE_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_HIRE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
