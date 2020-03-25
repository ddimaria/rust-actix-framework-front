import React from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "react-hook-form";
import { Button, Form, Icon } from "semantic-ui-react";
import { User } from "./User";

type FormProps = {
  onSubmit: (data: User) => void;
  setValue: any;
  handleSubmit: any;
  errors: any;
  register: any;
};

const UserForm: React.FC<FormProps> = (props: FormProps) => {
  let { handleSubmit, errors, onSubmit } = props;
  return (
    <Form onSubmit={handleSubmit(onSubmit as any)}>
      <Form.Field>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          placeholder="Enter First Name"
          ref={props.register}
          className={errors.first_name ? "error" : undefined}
        />
        <ErrorMessage errors={errors} name="first_name" />
      </Form.Field>

      <Form.Field>
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          placeholder="Enter Last Name"
          ref={props.register}
          className={errors.last_name ? "error" : undefined}
        />
        <ErrorMessage errors={errors} name="last_name" />
      </Form.Field>

      <Form.Field>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          ref={props.register}
          className={errors.email ? "error" : undefined}
        />
        <ErrorMessage errors={errors} name="email" />
      </Form.Field>

      <Form.Field>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          ref={props.register}
          className={errors.password ? "error" : undefined}
        />
        <ErrorMessage errors={errors} name="password" />
      </Form.Field>

      <Link to={`/user`}>
        <Button secondary>Back</Button>
      </Link>

      <Button
        primary
        type="submit"
        disabled={
          !!errors.first_name ||
          !!errors.last_name ||
          !!errors.email ||
          !!errors.password
        }
      >
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
