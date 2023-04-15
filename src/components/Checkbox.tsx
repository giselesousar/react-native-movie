import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CheckboxProps = {
  id: number;
  label: string;
  isChecked: boolean;
  check: (id: number, name: string) => void;
};

export default function Checkbox({
  id,
  label,
  isChecked,
  check,
}: CheckboxProps) {
  return (
    <TouchableOpacity onPress={() => check(id, label)} style={styles.container}>
      <MaterialCommunityIcons
        name={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
        size={26}
        style={styles.checkbox}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  checkbox: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
  },
});
