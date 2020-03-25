import React, { useContext } from "react";
import { Loader } from "semantic-ui-react";
import AppContext from "../AppState";
import "./Loading.css";

const Loading: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      {state.isLoading && (
        <div className="loading-bg">
          <div className="loading">
            <Loader active size="large" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
