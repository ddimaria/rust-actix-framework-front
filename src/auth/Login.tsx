import React, { useContext, useEffect, useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import AppContext from "./../AppState";
import Error from "./../error/Error";
// import usePost from "./../http/usePost";
// import { User } from "./../user/User";
import { axiosConfig, api } from "./../http/defaults";

type FormData = {
  email: string;
  password: string;
};

const defaultValues: FormData = {
  email: "model-test@nothing.org",
  password: "123456"
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters long")
    .required("Password is required")
});

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { dispatch } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultValues);
  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid }
  } = useForm<FormData>({
    validationSchema,
    mode: "onBlur"
  });

  const onSubmit = (data: FormData) => {
    setFormData(data);
    setIsSubmitting(true);
  };

  // const user = usePost<FormData | null, User | null>(
  //   "http://127.0.0.1:3000/api/v1/auth/login",
  //   null,
  //   formData
  // );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING_START" });
      try {
        const response = await axios.post(
          api + "/auth/login",
          formData,
          axiosConfig
        );
        dispatch({ type: "LOADING_END" });
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        props.history.push("/");
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
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100%" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Error />
        <Header as="h2" color="black" textAlign="center">
          Log-in to your account
        </Header>

        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment>
            <Form.Field>
              <div className="ui fluid left icon input">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  ref={register}
                  defaultValue={defaultValues.email}
                  className={errors.email ? "error" : undefined}
                />
                <Icon name={"user"} />
              </div>
              <ErrorMessage errors={errors} name="email" as="p" />
            </Form.Field>

            <Form.Field>
              <div className="ui fluid left icon input">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register}
                  defaultValue={defaultValues.password}
                  className={errors.password ? "error" : undefined}
                />
                <Icon name={"lock"} />
              </div>
              <ErrorMessage errors={errors} name="password" />
            </Form.Field>

            <Button
              primary
              type="submit"
              fluid
              size="large"
              disabled={!isValid}
            >
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
