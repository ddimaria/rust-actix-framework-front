import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./AppState";
import Routes from "./Routes";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "./loading/Loading";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <AppProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Loading />
            <Routes />
          </ErrorBoundary>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default function AppWithErrorBoundary() {
  return <App />;
}
