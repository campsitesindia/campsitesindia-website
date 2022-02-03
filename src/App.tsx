import React, {useEffect} from "react";
import MyRouter from "routers/index";
import ErrorBoundary from "./shared/error/error-boundary";
import {useAppDispatch, useAppSelector} from "./campsitesindia/config/store";
import {getSession} from "./shared/reducers/authentication";
import {hasAnyAuthority} from "./shared/auth/private-route";
import {AUTHORITIES} from "./campsitesindia/config/constants";



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
