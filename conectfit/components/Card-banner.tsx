import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";

export default function CardBanner() {
  return (
    <View style={styles.cardContainer}>
      <Link href="/home-screen" asChild>
        <Image
          style={styles.image}
          source={require("../assets/images/Treino.png")}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 50,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
});
