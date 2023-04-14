import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { setUser } from "../../actions/user";
import { withLocale } from "../../hoc/locale";

const { height } = Dimensions.get("screen");

type LoginProps = {
  openMenu: () => void;
};

function Login({ openMenu }: LoginProps) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");

  const enter = () => {
    if (username.length === 0) return;
    dispatch(setUser({ username }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>The Movies</Text>

      <View style={styles.content}>
        <Text style={styles.label}>{t("login:enterYourUsername")}</Text>
        <TextInput
          value={username}
          style={styles.input}
          onChangeText={setUsername}
          placeholder={t("login:username") as string}
        />
        <TouchableOpacity onPress={enter} style={styles.button}>
          <Text style={styles.textButton}>{t("login:enter")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openMenu}>
          <FontAwesome5 style={styles.locale} name="globe" size={26} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default withLocale(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    top: height * 0.25,
  },
  content: {
    marginHorizontal: 50,
    top: height * 0.3,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#000",
    padding: 10,
    marginVertical: 14,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 16,
  },
  locale: {
    textAlign: "center",
    top: height * 0.2,
  },
});
