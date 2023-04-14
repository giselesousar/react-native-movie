import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";

import Main from "./src/navigation/main";
import { store, persistor } from "./src/redux/store";

import "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/pt";
import "./src/locales/i18n";

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} translucent backgroundColor='transparent' />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          </PersistGate>
        </Provider>
    </Fragment>
  );
}
