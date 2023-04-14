import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "../screens";

const UnauthenticatedStack = createStackNavigator();

export default function Unauthenticated() {
  return (
    <UnauthenticatedStack.Navigator screenOptions={{ headerShown: false }}>
      <UnauthenticatedStack.Screen name="Login" component={Login} />
    </UnauthenticatedStack.Navigator>
  );
}
