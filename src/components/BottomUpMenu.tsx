import React, { useEffect, useRef, ReactNode } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

type BottomUpMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  style: ViewStyle;
};

const { height, width } = Dimensions.get("screen");

export default function BottomUpMenu({
  isOpen,
  onClose,
  children,
  style,
}: BottomUpMenuProps) {
  const animation = useRef(new Animated.Value(height)).current;

  function handleMenu(open: boolean) {
    Animated.timing(animation, {
      toValue: open ? 0 : 1,
      duration: 750,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();
  }

  const top = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  useEffect(() => {
    handleMenu(isOpen);
  }, [isOpen]);

  return (
    <Animated.View style={[styles.container, { top }]}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={styles.container} />
      </TouchableWithoutFeedback>
      <View style={[styles.menu, style]}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    flex: 1,
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 6,
  },
  menu: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    paddingVertical: 30,
    elevation: 15,
    overflow: "visible",
  },
});
