import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function MovieLoad() {
  const pulse = useRef(new Animated.Value(0)).current;

  function pulseAnimation() {
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(pulse, {
        toValue: 0.5,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start(() => pulseAnimation());
  }

  useEffect(() => {
    pulseAnimation();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Animated.View style={[styles.animation, { opacity: pulse }]} />
      </View>
      <View style={styles.content}>
        <View style={[styles.label, { width: "90%" }]}>
          <Animated.View style={[styles.animation, { opacity: pulse }]} />
        </View>
        <View style={[styles.label, { width: "80%" }]}>
          <Animated.View style={[styles.animation, { opacity: pulse }]} />
        </View>
        <View style={[styles.label, { width: "70%" }]}>
          <Animated.View style={[styles.animation, { opacity: pulse }]} />
        </View>
        <View style={styles.chips}>
          <View style={[styles.label, { width: "40%" }]}>
            <Animated.View style={[styles.animation, { opacity: pulse }]} />
          </View>
          <View style={[styles.label, { width: "30%" }]}>
            <Animated.View style={[styles.animation, { opacity: pulse }]} />
          </View>
          <View style={[styles.label, { width: "30%" }]}>
            <Animated.View style={[styles.animation, { opacity: pulse }]} />
          </View>
          <View style={[styles.label, { width: "40%" }]}>
            <Animated.View style={[styles.animation, { opacity: pulse }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20
  },
  content: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
  },
  image: {
    width: 110,
    height: 160,
    marginBottom: 10,
    overflow: "hidden",
  },
  label: {
    height: 12,
    marginBottom: 10,
  },
  animation: {
    backgroundColor: "#dedede",
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
});
