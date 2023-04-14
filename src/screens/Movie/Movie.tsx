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

import CastList from "./CastList";
import { Movie } from "../../models";
import { favoriteMovie } from "../../actions";

type MovieScreenParams = {
  movie: {
    movie: Movie;
    genreNames: string[];
  };
};

export default function MovieScreen() {
  const {
    params: { movie, genreNames },
  } = useRoute<RouteProp<MovieScreenParams, "movie">>();

  const { t } = useTranslation();

  const { movies } = useSelector((state: any) => state.favorites);

  const dispatch = useDispatch();

  const isFavorite = useMemo<boolean>(
    () => movies.find((m: Movie) => m.id === movie.id),
    [movies]
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity onPress={() => dispatch(favoriteMovie(movie))}>
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color="#d43449"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.avaliationContainer}>
          <MaterialCommunityIcons name="star" color="#ffd700" size={18} />
          <Text style={styles.average}>{movie.vote_average}/10 IMDb</Text>
        </View>
        <View style={styles.genres}>
          {(genreNames || []).map((name: string) => (
            <View key={`${movie.id}-${name}`} style={styles.genreWrap}>
              <Text style={styles.genreName}>{name}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.sectionLabel}>{t("common:description")}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.sectionLabel}>{t("common:cast")}</Text>
      <Suspense fallback={<ActivityIndicator />}>
        <CastList id={movie.id} />
      </Suspense>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
});
