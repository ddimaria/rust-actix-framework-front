import React, { useContext } from "react";
import { Message } from "semantic-ui-react";
import AppContext from "./../AppState";

const Error: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const handleClose = () => dispatch({ type: "ERRORS_REMOVED" });

  return (
    <div style={{ textAlign: "left" }}>
      {state.errors && state.errors.length >= 1 && (
        <Message
          color="red"
          attached
          header="Error"
          onDismiss={handleClose}
          list={state.errors}
        />
      )}
    </div>
  );
};

export default Error;
