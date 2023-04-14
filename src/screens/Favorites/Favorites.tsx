import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import useStaleWhileRevalidate from "swr";

import { Genre, Movie } from "../../models";
import { MovieCard } from "../../components";

const renderItem =
  (genres: Genre[]) =>
  ({ item }: { item: Movie }) =>
    <MovieCard {...item} genres={genres} />;

export default function Favorites() {
  const { data } = useStaleWhileRevalidate<Genre[] | undefined>([`get-genres`]);

  const { movies } = useSelector((state: any) => state.favorites);

  return (
    <FlatList
      data={movies || []}
      style={styles.list}
      renderItem={renderItem(data || [])}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
      keyExtractor={(item) => `favorite-${item.id}`}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
