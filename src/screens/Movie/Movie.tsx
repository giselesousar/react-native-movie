import React, { Suspense, useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import useStaleWhileRevalidate from "swr";
import axios from "axios";

import CastList from "./CastList";
import { Movie } from "../../models";
import { favoriteMovie } from "../../actions";
import { API_KEY } from "../../helpers/api";

type MovieScreenParams = {
  movie: {
    movie: Movie;
    genreNames: string[];
  };
};

const fetcher = async (
  movieId: number,
  language: string
): Promise<Movie | undefined> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=${language}&api_key=${API_KEY}`
    );
    return response.data;
  } catch (err) {}
};

const dollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const real = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function MovieScreen() {
  const {
    params: { movie, genreNames },
  } = useRoute<RouteProp<MovieScreenParams, "movie">>();

  const { t, i18n } = useTranslation();

  const { data } = useStaleWhileRevalidate(
    [`get-movie-${movie.id}-${i18n.language}`],
    () => fetcher(movie.id, i18n.language),
    { suspense: true }
  );
  const { username, favorites } = useSelector((state: any) => ({
    ...state.user,
    favorites: state.favorites.favorites.find(
      (favorite: any) => favorite.username === state.user.username
    ),
  }));

  const dispatch = useDispatch();

  const isFavorite = useMemo<boolean>(
    () => favorites?.movies.find((m: Movie) => m.id === movie.id),
    [favorites]
  );

  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text numberOfLines={2} style={styles.title}>{data?.title}</Text>
          <TouchableOpacity
            onPress={() => dispatch(favoriteMovie(username, movie))}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color="#d43449"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.avaliationContainer}>
          <MaterialCommunityIcons name="star" color="#ffd700" size={18} />
          <Text style={styles.average}>{data?.vote_average}/10 IMDb</Text>
        </View>
        <View style={styles.genres}>
          {(genreNames || []).map((name: string) => (
            <View key={`${data?.id}-${name}`} style={styles.genreWrap}>
              <Text style={styles.genreName}>{name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.infosContainer}>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>{t("common:runtime")}</Text>
            <Text style={styles.infoText}>{data?.runtime} min</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>{t("common:status")}</Text>
            <Text style={styles.infoText}>{data?.status}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>{t("common:budget")}</Text>
            <Text style={styles.infoText}>
              {i18n.language === "en-US"
                ? dollar.format(data?.budget || 0)
                : real.format(data?.budget || 0)}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.sectionLabel}>{t("common:description")}</Text>
      <Text style={styles.overview}>{data?.overview}</Text>
      <Text style={styles.sectionLabel}>{t("common:cast")}</Text>
      <Suspense fallback={<ActivityIndicator />}>
        <CastList id={data?.id} />
      </Suspense>
    </ScrollView>
  );
}

export function MovieScreenFallback() {
  return (
    <View style={styles.fillRemaining}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );
}

export default () => (
  <Suspense fallback={<MovieScreenFallback />}>
    <MovieScreen />
  </Suspense>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  fillRemaining: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
    maxWidth: '90%'
  },
  avaliationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  average: {
    color: "#959795",
    marginLeft: 4,
  },
  genres: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 14,
  },
  genreName: {
    color: "#8bb9dd",
    fontWeight: "bold",
  },
  genreWrap: {
    borderRadius: 14,
    backgroundColor: "#d0e2f1",
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: "#959795",
  },
  info: {},
  infoLabel: {
    color: "#959795",
    fontSize: 16,
  },
  infoText: {
    fontSize: 16,
  },
  infosContainer: {
    flexDirection: "row",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 30,
  },
});
