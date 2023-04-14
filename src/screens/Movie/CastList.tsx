import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useStaleWhileRevalidate from "swr";

import { Cast } from "../../models";
import { API_KEY } from "../../helpers/api";

const fetcher = async (
  movieId: number,
  language: string
): Promise<Cast[] | undefined> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=${language}`
    );
    return response.data.cast;
  } catch (err) {}
};

const renderItem = (item: Cast) => (
  <View key={`cast-${item.cast_id}`} style={styles.container}>
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/w500//${item.profile_path}`,
      }}
      resizeMode="cover"
      style={styles.image}
    />
    <Text style={styles.name}>{item.name}</Text>
  </View>
);

export default function CastList({ id }: any) {
  const { i18n } = useTranslation();

  const { data } = useStaleWhileRevalidate(
    [`get-credits-${id}`],
    () => fetcher(id, i18n.language),
    { suspense: true }
  );
  return <View style={styles.list}>{(data || []).map(renderItem)}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "29%",
    marginBottom: 20,
  },
  list: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    marginTop: 10,
  },
});
