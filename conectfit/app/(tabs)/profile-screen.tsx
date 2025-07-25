import { PersonalCard } from "@/components/Search-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { use, useEffect, useState } from "react";
import { FlatList, ToastAndroid } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Trainer {
  id: string;
  name: string;
  description: string;
  rating: number;
  avatar: string; // url da imagem
}

interface UserProfile {
  name: string;
  phone: string;
  city: string | null;
  birthdate: string;
  age: string;
  cref: string | null;
}

export default function ProfileScreen() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchTrainers = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    try {
      if (!token) {
        ToastAndroid.show("Usuário não autenticado", ToastAndroid.SHORT);
        setLoading(false);
        return;
      }

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      const trainersData = response.data.trainers;

      console.log(userData);

      const formatDateToDDMMYYYY = (dateStr: string): string => {
        const date = new Date(dateStr);
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
      };

      const calculateAge = (birthDateStr: string): number => {
        const birthDate = new Date(birthDateStr);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      setUser({
        name: userData.name || "Não informado",
        phone: userData.telephone || "Não informado",
        city: userData.neighborhood || "Não informado",
        birthdate: userData.birthdate
          ? formatDateToDDMMYYYY(userData.birthdate)
          : "Não informado",
        age: userData.birthdate
          ? String(calculateAge(userData.birthdate))
          : "Não informado",
        cref: userData.cref || null,
      });

      setTrainers(trainersData || []);
    } catch (error: any) {
      console.error(
        "Erro ao buscar trainers:",
        error.response?.data || error.message
      );
      ToastAndroid.show("Erro ao carregar os alunos", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <LinearGradient
        colors={["#FF0000", "#B22222"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.navbar}
      >
        <Link href={"/home-screen"}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Link>
        <View style={styles.userContainer}>
          <Image
            source={require("../../assets/images/image4.png")}
            style={styles.userImage}
          />
          <Text style={styles.userInfo}>{user?.name || "Não informado"}</Text>
          <Text style={styles.userInfo}>CÓDIGO: 1346</Text>
        </View>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
        />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {user?.cref ? (
          <View style={styles.primaryCard}>
            <View style={styles.primaryCardInfos}>
              <Text style={styles.primaryCardTextMain}>{trainers.length}</Text>
              <Text style={styles.primaryCardText}>Alunos Cadastrados</Text>
            </View>
            <View style={styles.primaryCardInfos}>
              <View style={styles.ratingContainer}>
                <Text style={styles.primaryCardTextMain}>5/5</Text>
                <MaterialIcons name="star" size={24} color="red" />
              </View>
              <Text style={styles.primaryCardText}>Avaliações</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="assignment" size={24} color="#FF0000" />
            <Text style={styles.cardTitle}>Dados Cadastrais</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{user?.name || "Não informado"}</Text>
            <Text style={styles.label}>Celular:</Text>
            <Text style={styles.value}>{user?.phone || "Não informado"}</Text>
            <Text style={styles.label}>Bairro:</Text>
            <Text style={styles.value}>{user?.city || "Não informado"}</Text>
            <Text style={styles.label}>Nascimento:</Text>
            <Text style={styles.value}>
              {user?.birthdate || "Não informado"} (
              {user?.age || "Não informado"} Anos)
            </Text>
            <Text style={styles.label}>Cref:</Text>
            <Text style={styles.value}>{user?.cref || "Não informado"}</Text>
          </View>
        </View>

        {user?.cref ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="person" size={24} color="#FF0000" />
              <Text style={styles.cardTitle}>Meus Alunos</Text>
            </View>
            <View style={styles.screenContainerUsers}>
              <FlatList
                contentContainerStyle={styles.flatlistContent}
                data={trainers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cardWrapper}>
                    <PersonalCard
                      name={item.name}
                      description={item.description}
                      rating={item.rating}
                      avatar={{ uri: item.avatar }}
                    />
                  </View>
                )}
                ListEmptyComponent={
                  !loading ? (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                      Nenhum aluno encontrado.
                    </Text>
                  ) : null
                }
                refreshing={loading}
                onRefresh={fetchTrainers}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // seu estilo permanece igual
  screenContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  navbar: {
    width: "100%",
    height: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logo: {
    width: 50,
    height: 50,
    bottom: 14,
  },
  userContainer: {
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  userInfo: {
    color: "#fff",
    textAlign: "center",
  },
  primaryCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    width: 300,
    height: 120,
    borderRadius: 25,
    padding: 10,
    alignSelf: "center",
    marginBottom: 30,
  },
  primaryCardInfos: {
    alignItems: "center",
    justifyContent: "center",
  },
  primaryCardTextMain: {
    fontSize: 30,
    textAlign: "center",
  },
  primaryCardText: {
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 40,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
    marginLeft: 10,
  },
  cardContent: {
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#FF0000",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  screenContainerUsers: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
    borderRadius: 10,
    overflow: "hidden",
  },
  flatlistContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
  },
});
