import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editOccupationData =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `occupation/${data.id}`, {
      method: "put",
      headers: myheader,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );

        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((occupation) => {
        console.log("occupation Updated", occupation);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Occupation!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2, setValue, value));
          }
        });
      })
      .catch((error) => dispatch(occupationFailed(error)));
  };

//*Loading
export const occupationLoading = () => ({
  type: ActionTypes.OCCUPATION_LOADING,
});

//*Failed
export const occupationFailed = (errmess) => ({
  type: ActionTypes.OCCUPATION_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(occupationLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id, {
    method: "get",
    headers: myheader,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((property) => {
      console.log("property", property);
      dispatch(fetchProperty(property));
      dispatch(occupationLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(occupationFailed(error)));
};

//!Loding false
export const occupationLoadingFalse = () => ({
  type: ActionTypes.OCCUPATION_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
