import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from "yup";
import AppContext from "./../AppState";
import useGet from "./../http/useGet";
import UserForm from "./UserForm";
import { User } from "./User";
import { axiosConfig } from "./../http/defaults";

type FormData = User;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required")
});

const UserEdit: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  let { id } = useParams();
  let user: User = useGet(`/user/${id}`);
  const { dispatch } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(user);
  const { register, handleSubmit, errors, setValue, formState } = useForm({
    validationSchema
  });

  // set form values
  if (user && !formState.dirty) {
    Object.entries(user).forEach(([key, value]) => setValue(key, value));
  }

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setIsSubmitting(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING_START" });
      try {
        await axios.put(
          `http://127.0.0.1:3000/api/v1/user/${user.id}`,
          formData,
          axiosConfig
        );
        dispatch({ type: "LOADING_END" });
        dispatch({
          type: "MESSAGES_ADDED",
          payload: [
            `User "${formData.first_name} ${formData.last_name}" has been updated.`
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
  }, [isSubmitting, dispatch, formData, props.history, user]);

  return (
    <div className="page">
      <>
        <h1>
          Edit User: {user?.first_name} {user?.last_name}
        </h1>

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
