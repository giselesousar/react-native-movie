import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { clearUser } from "../actions";

type HeaderActionsProps = {
  openMenu: () => void;
};

export default function HeaderActions({ openMenu }: HeaderActionsProps) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openMenu}>
        <FontAwesome5 name="globe" size={20} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(clearUser())}>
        <MaterialCommunityIcons name="logout" size={20} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 12,
  },
});
