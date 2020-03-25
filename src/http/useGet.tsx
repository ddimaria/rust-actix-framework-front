import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./../AppState";
import { api, axiosConfig } from "./defaults";

const useGet = (url: string, addBase = true) => {
  const { dispatch } = useContext(AppContext);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING_START" });
      try {
        let isFullUrl = url.substr(0, 4) === "http";
        let fullUrl = isFullUrl ? url : api + url;
        const response = await axios.get(fullUrl, axiosConfig);

        dispatch({ type: "LOADING_END" });
        setData(response.data);
      } catch (e) {
        const is401 = e.response.status === 401;

        dispatch({ type: "LOADING_END" });

        if (is401) {
          dispatch({ type: "LOGOUT_SUCCESS" });
          dispatch({
            type: "ERRORS_ADDED",
            payload: ["Session timeout. Please login again."]
          });
        } else {
          dispatch({ type: "ERRORS_ADDED", payload: e.response.data.errors });
        }
      }
    };

    fetchData();
  }, [dispatch, url]);

  return data;
};

export default useGet;
