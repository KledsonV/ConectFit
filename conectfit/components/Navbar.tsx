import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";

export default function Navbar() {
  return (
    <LinearGradient
      colors={["#FF0000", "#FF6347"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.navbar_container}
    >
      <View style={styles.content}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.image}
        />

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.logoutButton}>
            <MaterialIcons name="exit-to-app" size={30} color="#000" />
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  navbar_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    paddingHorizontal: 10,
    flexDirection: "row",
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  image: {
    width: 60,
    height: 50,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
  },
});

