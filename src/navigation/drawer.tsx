import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

import { Favorites, Home } from "../screens";
import { withLocale } from "../hoc/locale";
import { HeaderActions } from "../components";

type DrawerProps = {
  openMenu: () => void;
};

const Drawer = createDrawerNavigator();

function DrawerNavigator({ openMenu }: DrawerProps) {
  const { t } = useTranslation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#000",
        drawerActiveTintColor: "#000",
        headerRight: () => <HeaderActions openMenu={openMenu} />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: t("common:movies") as string,
          drawerLabel: t("common:movies") as string,
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerTitle: t("common:favorites") as string,
          drawerLabel: t("common:favorites") as string,
        }}
      />
    </Drawer.Navigator>
  );
}

export default withLocale(DrawerNavigator);
