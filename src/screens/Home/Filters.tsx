import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
  useRef,
  Ref,
} from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { SideMenuFilter } from "../../components";
import { Genre } from "../../models";
import { SideMenuHandle } from "../../components/SideMenuFilter";

type FiltersProps = {
  refresh: () => void;
  genres: Genre[];
  setFilterGenres: (checked: Genre[]) => void;
};

export type FiltersHandle = {
  query: () => string;
};

const { width } = Dimensions.get("screen");

function Filters(
  { refresh, genres, setFilterGenres }: FiltersProps,
  ref: Ref<FiltersHandle>
) {
  const [query, setQuery] = useState<string>("");

  const sideMenuFilterRef = useRef<SideMenuHandle>(null);

  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    query: () => query,
  }));

  useEffect(() => {
    const delay = setTimeout(refresh, 500);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.search}>
          <FontAwesome5 name="search" size={14} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder={t("common:search") as string}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity
          onPress={() => sideMenuFilterRef?.current?.open()}
          style={styles.filter}
        >
          <FontAwesome5 name="filter" size={16} />
        </TouchableOpacity>
      </View>
      <SideMenuFilter
        ref={sideMenuFilterRef}
        genres={genres}
        onSave={setFilterGenres}
      />
    </Fragment>
  );
}

export default forwardRef<FiltersHandle, FiltersProps>(Filters);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#aaa",
  },
  input: {
    width: "80%",
    paddingLeft: width * 0.02,
  },
  filter: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 50,
  },
});
