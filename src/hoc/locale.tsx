import React, { FC, Fragment } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";

import { BottomUpMenu } from "../components";

type Props = {
  openMenu: () => void;
};
type State = {
  isOpen: boolean;
};

enum LANGUAGE {
  "en-US" = 0,
  "pt-BR" = 1,
}

export const withLocale = (Wrapped: FC<Props>) => {
  return class InnerComponent extends React.Component<{}, State> {
    constructor(props: {}) {
      super(props);
      this.state = {
        isOpen: false,
      };
      this.openMenu = this.openMenu.bind(this);
      this.changeLanguage = this.changeLanguage.bind(this);
    }

    openMenu(): void {
      this.setState({
        isOpen: true,
      });
    }

    changeLanguage(value: LANGUAGE): void {
      this.setState({
        isOpen: false,
      });
      AsyncStorage.setItem("language", LANGUAGE[value]);
      i18n.changeLanguage(LANGUAGE[value]);
    }

    render() {
      return (
        <Fragment>
          <Wrapped {...this.props} openMenu={this.openMenu} />
          <BottomUpMenu
            isOpen={this.state.isOpen}
            onClose={() => this.setState({ isOpen: false })}
            style={styles.menu}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.changeLanguage(LANGUAGE["en-US"])}
            >
              <Text style={styles.label}>{i18n.t("common:english")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.changeLanguage(LANGUAGE["pt-BR"])}
            >
              <Text style={styles.label}>{i18n.t("common:portuguese")}</Text>
            </TouchableOpacity>
          </BottomUpMenu>
        </Fragment>
      );
    }
  };
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
  },
  menu: {
    padding: 20,
  },
  label: {
    fontSize: 18,
  },
});
