import axios from "axios";
import {
  POST_HIRING_REQUEST_REQUEST,
  POST_HIRING_REQUEST_SUCCESS,
  POST_HIRING_REQUEST_FAIL,
} from "../constants/hiringConstants";

export const postHiringRequest =
  (startDate, endDate, email, status, id) => async (dispatch) => {
    try {
      dispatch({
        type: POST_HIRING_REQUEST_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ startDate, endDate, email, status });

      const { data } = await axios.post(
        `/api/v1/hiring-request/book/${id}`,
        body,
        config
      );

      dispatch({
        type: POST_HIRING_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_HIRING_REQUEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
