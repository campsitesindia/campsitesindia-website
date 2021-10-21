import React from "react";
import ReactDOM from "react-dom";
//
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
//
import AppComponent from "./App";
import reportWebVitals from "./reportWebVitals";
import setupAxiosInterceptors from "./campsitesindia/config/axios-interceptor";
import {clearAuthentication} from "./shared/reducers/authentication";
import {bindActionCreators} from "redux";
import {registerLocale} from "./campsitesindia/config/translation";
import getStore from "./campsitesindia/config/store";
import {Provider} from "react-redux";
import ErrorBoundary from "./shared/error/error-boundary";

const store = getStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

//ReactDOM.render(<App />, document.getElementById("root"));
const rootEl = document.getElementById('root');

const render = Component =>
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(
        <ErrorBoundary>
            <Provider store={store}>
                <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">

                    <Component />
                </div>
            </Provider>
        </ErrorBoundary>,
        rootEl
    );

render(AppComponent);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
