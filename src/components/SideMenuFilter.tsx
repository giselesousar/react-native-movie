import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect,
} from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { Genre } from "../models";
import Checkbox from "./Checkbox";

type SideMenuFilterProps = {
  genres: Genre[];
  onSave: (checked: Genre[]) => void;
};

export type SideMenuHandle = {
  open: () => void;
};

const { height } = Dimensions.get("screen");

function SideMenuFilter(
  { genres, onSave }: SideMenuFilterProps,
  ref: Ref<SideMenuHandle>
) {
  const [checked, setChecked] = useState<Genre[]>(genres);
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  const isChecked = useCallback(
    (id: number) => Boolean(checked.find((genre: Genre) => genre.id === id)),
    [checked]
  );

  const check = (id: number, name: string) => {
    const filtered = checked.filter((genre: Genre) => genre.id !== id);
    setChecked(
      filtered.length < checked.length ? filtered : [...checked, { id, name }]
    );
  };

  useEffect(() => {
    setChecked(genres);
  }, [genres]);

  return (
    <View style={styles.container}>
      <Modal visible={isOpen} transparent={true}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.menu}>
            <View style={styles.row}>
              <Text style={styles.label}>{t("common:genres")}</Text>
              <TouchableOpacity
                onPress={() => {
                  onSave(checked);
                  setIsOpen(false);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{t("common:save")}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapped}>
              {(genres || []).map((genre: Genre) => (
                <View key={`genre-${genre.id}`}>
                  <Checkbox
                    id={genre.id}
                    label={genre.name}
                    isChecked={isChecked(genre.id)}
                    check={check}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

export default forwardRef<SideMenuHandle, SideMenuFilterProps>(SideMenuFilter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "#fff",
    height: height * 0.7,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    position: "absolute",
    borderRadius: 8,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  wrapped: {
    flexWrap: "wrap",
    gap: 5,
    marginTop: 10,
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
