import React from "react";
import MyRouter from "routers/index";
import ErrorBoundary from "./shared/error/error-boundary";


function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ErrorBoundary>
      <MyRouter />
        </ErrorBoundary>
    </div>
  );
}

export default App;
