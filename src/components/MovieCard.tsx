import React, { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Genre, Movie } from "../models";

type MovieCardProps = {
  genres: Genre[];
} & Movie;

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  genre_ids,
  genres,
  ...rest
}: MovieCardProps) {
  const navigation = useNavigation();
  const genreNames = useMemo<string[]>(
    () =>
      genres
        ?.filter((genre: Genre) => genre_ids.includes(genre.id))
        ?.map((genre: Genre) => genre.name),
    [genres, genre_ids]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(
          "Movie" as never,
          {
            movie: { id, title, poster_path, vote_average, genre_ids, ...rest },
            genreNames,
          } as never
        )
      }
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500//${poster_path}`,
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.avaliationContainer}>
          <MaterialCommunityIcons name="star" color="#ffd700" size={18} />
          <Text style={styles.average}>{vote_average}/10 IMDb</Text>
        </View>
        <View style={styles.genres}>
          {(genreNames || []).map((name: string) => (
            <View key={`${id}-${name}`} style={styles.genreWrap}>
              <Text style={styles.genreName}>{name}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: 110,
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  avaliationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  average: {
    color: "#aaa",
    marginLeft: 4,
  },
  content: {
    marginLeft: 10,
    width: "65%",
  },
  genres: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 10,
  },
  genreName: {
    color: "#8bb9dd",
    fontWeight: "bold",
  },
  genreWrap: {
    borderRadius: 8,
    backgroundColor: "#d0e2f1",
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
});
