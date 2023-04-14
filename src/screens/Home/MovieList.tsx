import React, { useCallback, useEffect, Fragment } from "react";
import { FlatList, StyleSheet } from "react-native";
import useInfiniteStaleWhileRevalidate from "swr/infinite";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { Genre, Movie, MoviesPayload } from "../../models";
import { MovieCard, MovieCardLoad } from "../../components";
import { API_KEY } from "../../helpers/api";

type MovieListProps = {
  genres: Genre[];
};

const fetcher = async (language: string, page: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`
    );
    return response.data;
  } catch (err) {}
};

const renderItem =
  (genres: Genre[]) =>
  ({ item }: { item: MoviesPayload }) =>
    (
      <Fragment>
        {item.results?.flatMap((movie: Movie) => (
          <MovieCard key={movie.id} {...movie} genres={genres} />
        ))}
      </Fragment>
    );

export default function MovieList({ genres }: MovieListProps) {
  const { i18n } = useTranslation();

  const { data, mutate, isValidating, size, setSize } =
    useInfiniteStaleWhileRevalidate(
      (page: number) => [`get-movies${page}`, page + 1],
      ([_, page]: [string, number]) => fetcher(i18n.language, page),
      { suspense: true }
    );

  const didReachTheEnd = useCallback<() => boolean | undefined>(
    () => data && size >= data[0].total_pages,
    [data, size]
  );

  const onEndReached = useCallback<() => void>(
    () => !isValidating && setSize(size + 1),
    [isValidating, size, setSize]
  );

  useEffect(() => {
    mutate();
  }, [i18n.language]);

  return (
    <FlatList
      data={data || []}
      style={styles.list}
      renderItem={renderItem(genres)}
      onEndReachedThreshold={0.3}
      contentContainerStyle={{ flexGrow: 1 }}
      keyExtractor={(item) => `movie-${item.page}`}
      ListFooterComponent={isValidating ? <MovieListFallback /> : null}
      onEndReached={() => !didReachTheEnd() && onEndReached()}
    />
  );
}

export const MovieListFallback = () => (
  <Fragment>
    {Array.from({ length: 4 }).map((_, index) => (
      <MovieCardLoad key={`inbox-load-${index}`} />
    ))}
  </Fragment>
);

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#fff",
    flex: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
