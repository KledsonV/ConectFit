import CardBanner from "@/components/Card-banner";
import Navbar from "@/components/Navbar";
import { PersonalCard, SearchBar } from "@/components/Search-bar";
import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

const trainers = [
  {
    id: "1",
    name: "Caio Rodrigues",
    description: "Personal, cross training e hidroginástica",
    rating: 5,
    avatar: require("../../assets/images/image4.png"),
  },
  {
    id: "2",
    name: "Lucas Nascimento",
    description: "Personal, cross training e hidroginástica",
    rating: 5,
    avatar: require("../../assets/images/image4.png"),
  },
  {
    id: "3",
    name: "Yasmim Pereira",
    description: "Personal e hidroginástica",
    rating: 5,
    avatar: require("../../assets/images/image4.png"),
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Navbar />
      <FlatList
        contentContainerStyle={styles.flatlistContent}
        ListHeaderComponent={
          <View>
            <CardBanner />
            <View style={styles.container}>
              <SearchBar />
            </View>
          </View>
        }
        data={trainers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <PersonalCard
              name={item.name}
              description={item.description}
              rating={item.rating}
              avatar={item.avatar}
            />
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#111",
    marginBottom: 50
  },
  flatlistContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  container: {
    marginBottom: 20,
  },
  cardWrapper: {
    marginBottom: 12,
    backgroundColor: "red", // Só pra exemplo, remove se não quiser
    borderRadius: 10,
    padding: 10,
  },
});
