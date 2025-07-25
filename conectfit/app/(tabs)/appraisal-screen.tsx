import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import api from "../services/api";
import { Picker } from "@react-native-picker/picker";
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

const genderMap = {
  Masculino: "Male",
  Feminino: "Female",
  Outro: "Other",
};

export default function AppraisalScreen() {
  const [form, setForm] = useState({
    idade: "",
    dataAvaliacao: "",
    altura: "",
    peso: "",
    genero: "MASCULINO",
    pescoco: "",
    ombro: "",
    torax: "",
  });
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [birthDate, setBirthDate] = useState("");

  const convertToBackendFormat = (date: string) => {
    const [day, month, year] = date.split("/");
    if (!day || !month || !year) return null;
    return `${year}-${month}-${day}`;
  };

  const backendBirthDate = convertToBackendFormat(birthDate);

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

  const formatDateInput = (text: string) => {
    const digits = text.replace(/\D/g, "");

    let formatted = digits;
    if (digits.length > 2 && digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(
        4,
        8
      )}`;
    }

    setBirthDate(formatted);
  };

  const handleSubmit = async () => {
    if (!form.idade || !form.altura || !form.peso) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const response = await api.post("assessments", {
        studentName: user?.name,
        assessmentDate: backendBirthDate, // precisa estar em formato 'YYYY-MM-DD'
        age: Number(form.idade),
        gender: genderMap[form.genero], // certifique-se que seja 'Male', 'Female' ou 'Other'

        weight: parseFloat(form.peso),
        height: parseFloat(form.altura),

        bmi: parseFloat(form.imc), // se não tiver esse campo calculado no front, set null ou calcule antes
        bodyFatPercentage: parseFloat(form.percentualGordura) || null,
        leanMass: parseFloat(form.massaMagra) || null,

        waistCircumference: parseFloat(form.cintura) || null,
        chestCircumference: parseFloat(form.torax) || null,
        armCircumference: parseFloat(form.braco) || null,
        thighCircumference: parseFloat(form.coxa) || null,

        notes: form.observacoes || null,
      });

      Alert.alert("Sucesso", "Avaliação salva com sucesso!");
    } catch (error) {
      console.log(error);

      console.error("Erro ao salvar avaliação:", error);
      alert("Erro ao salvar avaliação.");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <HorizontalEvaluation />
      <View style={styles.content}>
        <Text style={styles.title}>Adicionar Avaliação</Text>

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: 22"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.idade}
          onChangeText={(text) => setForm({ ...form, idade: text })}
        />

        <Text style={styles.label}>Data da Avaliação</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          value={birthDate}
          onChangeText={formatDateInput}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#aaa"
          maxLength={10}
        />

        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: 175"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.altura}
          onChangeText={(text) => setForm({ ...form, altura: text })}
        />

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: 70"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.peso}
          onChangeText={(text) => setForm({ ...form, peso: text })}
        />

        <Text style={styles.label}>Gênero</Text>
        <Picker
          selectedValue={form.genero}
          onValueChange={(itemValue) => setForm({ ...form, genero: itemValue })}
          style={styles.inputText}
        >
          <Picker.Item label="Masculino" value="MASCULINO" />
          <Picker.Item label="Feminino" value="FEMININO" />
        </Picker>

        <Text style={styles.label}>Pescoço (cm)</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: 40"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.pescoco}
          onChangeText={(text) => setForm({ ...form, pescoco: text })}
        />

        <Text style={styles.label}>Ombro (cm)</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: 50"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.ombro}
          onChangeText={(text) => setForm({ ...form, ombro: text })}
        />

        <Text style={styles.label}>Tórax (cm)</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: 90"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={form.torax}
          onChangeText={(text) => setForm({ ...form, torax: text })}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.addButtonText}>Adicionar Avaliação</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const HorizontalEvaluation = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.pill, styles.firstPill]}>
        <LinearGradient
          colors={["#FFFFFF", "#FFAAAA"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.pillText, { color: "#000" }]}>1 AVALIAÇÃO</Text>
        </LinearGradient>
      </View>

      <View style={[styles.pill, styles.secondPill]}>
        <LinearGradient
          colors={["#FF5555", "#CC0000"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.pillText}>2 AVALIAÇÃO</Text>
        </LinearGradient>
      </View>

      <View style={[styles.pill, styles.thirdPill]}>
        <LinearGradient
          colors={["#990000", "#330000"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.pillText}>3 AVALIAÇÃO</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },
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
    height: 50,
  },
  mainTitle: {
    color: "#FF0000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    color: "#666",
    fontSize: 16,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  inputTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 15,
  },
  inputText: {
    color: "#FFF",
    fontSize: 16,
  },
  redTitle: {
    color: "#FF0000",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    height: 50,
  },
  pill: {
    width: 140,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: -10,
    zIndex: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  firstPill: {
    transform: [{ translateX: 20 }],
    zIndex: 1,
  },
  secondPill: {
    zIndex: 2,
  },
  thirdPill: {
    transform: [{ translateX: -20 }],
    zIndex: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    color: "#FFF",
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    width: "100%",
    marginLeft: 40,
  },
  addButton: {
    backgroundColor: "#B22222",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 15,
    paddingBottom: 20,
  },
});
