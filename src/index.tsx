import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./components/Card";
import { useSharedValue } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <View style={styles.container}>
      {Cards.map((card, index) => (
        <Card key={index} card={card} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};

const Cards = [
  {
    source: require("../assets/chariot.png"),
  },
  {
    source: require("../assets/death.png"),
  },
  {
    source: require("../assets/devil.png"),
  },
  {
    source: require("../assets/fool.png"),
  },
  {
    source: require("../assets/hermit.png"),
  },
  {
    source: require("../assets/high-priestess.png"),
  },
  {
    source: require("../assets/judegment.png"),
  },
  {
    source: require("../assets/justice.png"),
  },
  {
    source: require("../assets/lover.png"),
  },
  {
    source: require("../assets/moon.png"),
  },
  {
    source: require("../assets/pendu.png"),
  },

  {
    source: require("../assets/strength.png"),
  },
  {
    source: require("../assets/sun.png"),
  },
  {
    source: require("../assets/temperance.png"),
  },
  {
    source: require("../assets/tower.png"),
  },
  {
    source: require("../assets/wheel.png"),
  },
  {
    source: require("../assets/world.png"),
  },
];

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
});
