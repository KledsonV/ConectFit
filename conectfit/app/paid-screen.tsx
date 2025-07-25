import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const paidMonths = [
  {
    id: "2",
    periodo: "01/05/2024 a 31/05/2025",
    modalidade: "Funcional",
    chavePix: "123.456.789.10",
    vencimento: "31/08/2025",
    sacador: "Julia Rodrigues",
    valor: "R$150,00",
  },
  {
    id: "3",
    periodo: "01/04/2024 a 30/04/2025",
    modalidade: "Funcional",
    chavePix: "123.456.789.10",
    vencimento: "30/09/2025",
    sacador: "Julia Rodrigues",
    valor: "R$150,00",
  },
  {
    id: "4",
    periodo: "01/03/2024 a 31/03/2025",
    modalidade: "Funcional",
    chavePix: "123.456.789.10",
    vencimento: "31/10/2025",
    sacador: "Julia Rodrigues",
    valor: "R$150,00",
  },
  {
    id: "5",
    periodo: "01/02/2024 a 28/02/2025",
    modalidade: "Funcional",
    chavePix: "123.456.789.10",
    vencimento: "28/11/2025",
    sacador: "Julia Rodrigues",
    valor: "R$150,00",
  },
  {
    id: "6",
    periodo: "01/01/2024 a 31/01/2025",
    modalidade: "Funcional",
    chavePix: "123.456.789.10",
    vencimento: "31/12/2025",
    sacador: "Julia Rodrigues",
    valor: "R$150,00",
  },
  {
    id: "7",
    periodo: "01/12/2024 a 30/12/2024",
    modalidade: "Funcional",
    chavePix: "123.456.789.10",
    vencimento: "30/01/2025",
    sacador: "Julia Rodrigues",
    valor: "R$150,00",
  },
];

export default function PaidScreen() {
  return (
    <>
      <View>
        <LinearGradient
          colors={["#FF0000", "#B22222"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.navbar}>
            <Link href={"/payments-screen"}>
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </Link>
            <Text style={styles.navbarText}>Pagos</Text>
            <Image
              source={require("../assets/images/Logo.png")}
              style={styles.logo}
            />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        <FlatList
          data={paidMonths}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.header}>
                <Ionicons
                  name="checkmark-circle"
                  size={28}
                  color="#60EF59"
                  style={styles.icon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Mensalidade {item.periodo}</Text>
                  <Text style={styles.subtitle}>- {item.modalidade}</Text>
                </View>
                <Text style={styles.valor}>{item.valor}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.detail}>Chave PIX: {item.chavePix}</Text>
                <Text style={styles.detail}>vencimento: {item.vencimento}</Text>
                <Text style={styles.detail}>Sacador: {item.sacador}</Text>
              </View>

              <Text style={styles.verMais}>⌄ visualizar detalhes</Text>
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  navbarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  valor: {
    fontWeight: "600",
    fontSize: 14,
  },
  info: {
    marginTop: 4,
    marginBottom: 8,
  },
  detail: {
    fontSize: 13,
  },
  verMais: {
    fontSize: 13,
    color: "#222",
  },
});
