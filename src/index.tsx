import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persitedStore } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "components/Loader";
import ModalWrapper from "modal/components/ModalWrapper";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Flowbite theme={{ theme, dark: true }}>
        <HashRouter>
            <Provider store={store}>
                <PersistGate
                    loading={<Loader isLoading />}
                    persistor={persitedStore}
                >
                    {" "}
                    <ModalWrapper>
                        <App />
                    </ModalWrapper>
                </PersistGate>
            </Provider>
        </HashRouter>
    </Flowbite>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
