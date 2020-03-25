import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./../AppState";
import { api, axiosConfig } from "./defaults";

const usePost = <T, U>(url: string, initialData: T, postData: U) => {
  const { dispatch } = useContext(AppContext);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING_START" });

      try {
        const response = await axios.post(api + url, postData, axiosConfig);

        dispatch({ type: "LOADING_END" });
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        setData(response.data);
      } catch (e) {
        dispatch({ type: "LOADING_END" });
        dispatch({ type: "ERRORS_ADDED", payload: e.response.data.errors });
      }
    };

    fetchData();
  }, [dispatch, url]);

  return data;
};

export default usePost;
