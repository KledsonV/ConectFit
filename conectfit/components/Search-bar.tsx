import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        placeholder="Qual bairro você quer treinar?"
        placeholderTextColor="#888"
        style={styles.searchInput}
      />
    </View>
  );
};

export const PersonalCard = ({ name, description, rating, avatar }: any) => {
  return (
    <View style={styles.card}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}/5</Text>
        <Ionicons name="star" size={16} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    height: 45,
    width: "100%",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  description: {
    fontSize: 13,
    color: "gray",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontWeight: "bold",
    marginRight: 3,
    color: "#000",
  },
});
