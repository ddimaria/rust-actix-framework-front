import React, { useContext, useState } from "react";
import { Message as SemanticMessage } from "semantic-ui-react";
import AppContext from "./../AppState";

const Message: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [showToast, setShowToast] = useState(true);
  const handleClose = () => dispatch({ type: "MESSAGES_REMOVED" });

  return (
    <>
      {state.messages && state.messages.length >= 1 && (
        <div style={{ textAlign: "center" }}>
          <SemanticMessage
            color="green"
            attached
            onDismiss={handleClose}
            list={state.messages}
          />
        </div>
      )}
    </>
  );
};

export default Message;
