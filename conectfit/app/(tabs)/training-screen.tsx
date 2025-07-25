import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const trainings = [
  { id: "A", label: "A", grupos: "Costas/Peito", exercicios: 8 },
  { id: "B", label: "B", grupos: "Bíceps/Tríceps", exercicios: 7 },
  { id: "C", label: "C", grupos: "Ombro/Perna", exercicios: 9 },
  { id: "A2", label: "A", grupos: "Bíceps/Tríceps", exercicios: 8 },
  { id: "B2", label: "B", grupos: "Costas/Peito", exercicios: 7 },
  { id: "C2", label: "C", grupos: "Ombro/Perna", exercicios: 9 },
];

export default function TrainingScreen() {
  const renderTreino = ({ item }: any) => (
    <TouchableOpacity onPress={() => router.push(`/exercice${item.id}`)}>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardLetter}>{item.label}</Text>
          <View>
            <Text style={styles.cardGroupLabel}>Grupos Musculares</Text>
            <Text style={styles.cardMuscles}>{item.grupos}</Text>
          </View>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardNumber}>{item.exercicios}</Text>
          <Text style={styles.cardExercises}>Exercícios</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.professorLabel}>Professor</Text>
          <Text style={styles.professorName}>Caio Rodrigues</Text>
        </View>
      </View>

      {/* Objetivo e data */}
      <View style={styles.goalContainer}>
        <View>
          <Text style={styles.goalLabel}>Objetivo</Text>
          <Text style={styles.goalText}>Hipertrofia</Text>
        </View>
        <View>
          <Text style={styles.goalLabel}>Data de início</Text>
          <Text style={styles.goalText}>06/06/2025</Text>
        </View>
      </View>

      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={renderTreino}
      />
    </View>
    // <View style={styles.container}>
    //   <LinearGradient
    //     colors={["#FF0000", "#FF6347"]}
    //     start={{ x: 0, y: 0 }}
    //     end={{ x: 1, y: 0 }}
    //     style={styles.navbar}
    //   >
    //     <MaterialIcons name="folder" size={24} color="#fff" />
    //     <Text style={styles.navbarText}>Histórico</Text>
    //     <Image
    //       source={require("../../assets/images/Logo.png")}
    //       style={styles.logo}
    //     />
    //   </LinearGradient>

    //   <View style={styles.content}>
    //     <Image
    //       source={require("../../assets/images/Logo_black.png")}
    //       style={styles.icon}
    //     />
    //     <Text style={styles.title}>Nenhum Registro</Text>
    //     <Text style={styles.subtitle}>Não há nenhum histórico registrado</Text>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  navbarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: "#FF0000",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#D60000",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  professorLabel: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  professorName: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  goalContainer: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: "#D60000",
    borderBottomWidth: 2,
  },
  goalLabel: {
    color: "#BBBBBB",
    fontSize: 12,
  },
  goalText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardLetter: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D60000",
    marginRight: 12,
  },
  cardGroupLabel: {
    color: "#D60000",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardMuscles: {
    fontSize: 14,
    color: "#333333",
  },
  cardRight: {
    alignItems: "center",
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D60000",
  },
  cardExercises: {
    fontSize: 12,
    color: "#555555",
  },
});
