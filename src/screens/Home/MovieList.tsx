import React, {
  useCallback,
  useEffect,
  Fragment,
  useRef,
  useState,
} from "react";
import { FlatList, StyleSheet } from "react-native";
import useInfiniteStaleWhileRevalidate from "swr/infinite";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { Genre, Movie, MoviesPayload } from "../../models";
import { MovieCard, MovieCardLoad } from "../../components";
import { API_KEY } from "../../helpers/api";
import Filters, { FiltersHandle } from "./Filters";

type MovieListProps = {
  genres: Genre[];
};

const fetcher = async (language: string, page: number, query: string) => {
  try {
    const url =
      query?.length > 0
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${language}&page=${page}&query=${query}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {}
};

const renderItem =
  (genres: Genre[], filterGenres: number[]) =>
  ({ item }: { item: MoviesPayload }) =>
    (
      <Fragment>
        {item.results?.flatMap((movie: Movie) =>
          movie.genre_ids.some((value: number) =>
            filterGenres.includes(value)
          ) ? (
            <MovieCard key={movie.id} {...movie} genres={genres} />
          ) : null
        )}
      </Fragment>
    );

export default function MovieList({ genres }: MovieListProps) {
  const { i18n } = useTranslation();
  const [filterGenres, setFilterGenres] = useState<Genre[]>(genres);

  const filtersRef = useRef<FiltersHandle>(null);

  const { data, mutate, isValidating, size, setSize } =
    useInfiniteStaleWhileRevalidate(
      (page: number) => [
        `get-movies-${page}-${i18n.language}`,
        page + 1,
        filtersRef?.current?.query(),
      ],
      ([_, page, query]: [string, number, string]) =>
        fetcher(i18n.language, page, query),
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

  useEffect(() => {
    setFilterGenres(genres);
  }, [genres]);

  return (
    <FlatList
      data={data || []}
      style={styles.list}
      renderItem={renderItem(
        genres,
        filterGenres.map((genre: Genre) => genre.id)
      )}
      onEndReachedThreshold={0.3}
      contentContainerStyle={{ flexGrow: 1 }}
      keyExtractor={(item) => `movie-${item.page}`}
      ListHeaderComponent={
        <Filters
          ref={filtersRef}
          refresh={mutate}
          genres={genres}
          setFilterGenres={setFilterGenres}
        />
      }
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
