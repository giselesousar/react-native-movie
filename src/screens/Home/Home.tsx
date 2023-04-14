import React, { Suspense, useEffect } from "react";
import { View } from "react-native";
import useStaleWhileRevalidate from "swr";
import axios from "axios";
import { useTranslation } from "react-i18next";

import MovieList, { MovieListFallback } from "./MovieList";
import { Genre } from "../../models";
import { API_KEY } from "../../helpers/api";

const fetcher = async (language: string): Promise<Genre[] | undefined> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`
    );
    return response.data.genres;
  } catch (err) {}
};

export default function Home() {
  const { i18n } = useTranslation();
  const { data, mutate } = useStaleWhileRevalidate([`get-genres`], () =>
    fetcher(i18n.language)
  );

  useEffect(() => {
    mutate();
  }, [i18n.language]);

  return (
    <View style={{ flex: 1 }}>
      <Suspense fallback={<MovieListFallback />}>
        <MovieList genres={data || []} />
      </Suspense>
    </View>
  );
}
