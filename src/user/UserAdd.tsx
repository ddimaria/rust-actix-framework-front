import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from "yup";
import AppContext from "./../AppState";
import UserForm from "./UserForm";
import { User } from "./User";
import { axiosConfig } from "./../http/defaults";

type FormData = User;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  password: Yup.string().required("Password is required")
});

const UserEdit: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { dispatch } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>();
  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setIsSubmitting(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING_START" });
      try {
        await axios.post(
          `http://127.0.0.1:3000/api/v1/user`,
          formData,
          axiosConfig
        );
        dispatch({ type: "LOADING_END" });
        dispatch({
          type: "MESSAGES_ADDED",
          payload: [
            `User "${formData?.first_name} ${formData?.last_name}" has been added.`
          ]
        });
        props.history.push("/user");
      } catch (e) {
        dispatch({ type: "LOADING_END" });
        dispatch({ type: "ERRORS_ADDED", payload: e.response.data.errors });
        setIsSubmitting(false);
      }
    };

    if (isSubmitting) {
      fetchData();
    }
  }, [isSubmitting, dispatch, formData, props.history]);

  return (
    <div className="page">
      <>
        <h1>Add a User</h1>

        <UserForm
          onSubmit={onSubmit}
          setValue={setValue}
          handleSubmit={handleSubmit}
          errors={errors}
          register={register}
        />
      </>
    </div>
  );
};

export default UserEdit;
