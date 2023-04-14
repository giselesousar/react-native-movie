import React, { Fragment } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Drawer from "./drawer";
import Unauthenticated from "./unauthenticated";
import { Movie } from "../screens";

const MainStack = createStackNavigator();

export default function Main() {
  const { t } = useTranslation();
  const { username } = useSelector((state: any) => state.user);
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {username ? (
        <Fragment>
          <MainStack.Screen name="Drawer" component={Drawer} />
          <MainStack.Screen
            name="Movie"
            component={Movie}
            options={{
              headerShown: true,
              headerTitle: t("common:movie") as string,
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          />
        </Fragment>
      ) : (
        <MainStack.Screen name="Unauthenticated" component={Unauthenticated} />
      )}
    </MainStack.Navigator>
  );
}
