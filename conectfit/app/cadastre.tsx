import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import Feather from "react-native-vector-icons/Feather";
import api from "./services/api";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(""); // <- NOVO
  const [neighborhood, setNeighborhood] = useState(""); // <- NOVO
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  const [cref, setCref] = useState("");

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

  const convertToBackendFormat = (date: string) => {
    const [day, month, year] = date.split("/");
    if (!day || !month || !year) return null;
    return `${year}-${month}-${day}`;
  };

  const handleRegister = async () => {
    const backendBirthDate = convertToBackendFormat(birthDate);
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !birthDate ||
      !neighborhood
    ) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "As senhas não coincidem",
      });
      return;
    }

    if (!isChecked) {
      Toast.show({
        type: "error",
        text1: "Você deve aceitar os Termos de Serviço",
      });
      return;
    }

    try {
      const payload = {
        name,
        email,
        telephone: phone,
        password,
        birthdate: backendBirthDate,
        neighborhood,
        ...(isProfessor && { cref }),
      };

      await api.post("/auth/register", payload);

      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso!",
      });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
        text2: error?.response?.data?.message || "Tente novamente mais tarde.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/bg-login.png")}
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.form_container}>
            <Text style={styles.login_text}>Cadastro</Text>
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Nome"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="E-mail"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                onChangeText={formatDateInput}
                value={birthDate}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                maxLength={10}
              />
              <TextInput
                style={styles.input}
                onChangeText={setNeighborhood}
                value={neighborhood}
                placeholder="Bairro"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Celular"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
              />

              <View style={styles.password_container}>
                <TextInput
                  style={styles.input_password}
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Senha"
                  placeholderTextColor="#aaa"
                />
              </View>

              <View style={styles.password_container}>
                <TextInput
                  style={styles.input_password}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholder="Confirmar Senha"
                  placeholderTextColor="#aaa"
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eye_icon}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
                </Pressable>
              </View>

              <View style={[styles.section, { marginTop: 20 }]}>
                <Checkbox
                  style={styles.checkbox}
                  value={isProfessor}
                  onValueChange={setIsProfessor}
                  color={isProfessor ? "#E10712" : undefined}
                />
                <Text style={styles.paragraph}>Cadastrar como professor</Text>
              </View>

              {isProfessor && (
                <TextInput
                  style={[styles.input, { marginTop: 15 }]}
                  onChangeText={setCref}
                  value={cref}
                  placeholder="CREF do professor"
                  placeholderTextColor="#aaa"
                />
              )}

              <View style={[styles.section, { marginTop: 25 }]}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#E10712" : undefined}
                />
                <Text style={styles.paragraph}>
                  Ao registrar-se em nosso aplicativo, você concorda com os
                  Termos de Serviço.
                </Text>
              </View>

              <Pressable
                style={styles.button_container}
                onPress={handleRegister}
              >
                <LinearGradient
                  colors={["#752222", "#E10712"]}
                  style={styles.gradient}
                >
                  <Text style={styles.text}>Cadastrar</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.infos_container}>
                <Pressable onPress={() => router.push("/login")}>
                  <Text style={styles.infos}>
                    Já tem uma conta?{" "}
                    <Text style={styles.cadastre}>Conecte-se</Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  form_container: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  login_text: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 30,
  },
  input_container: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    color: "#000",
    padding: 15,
    marginBottom: 15,
  },
  password_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input_password: {
    flex: 1,
    color: "#000",
    paddingVertical: 15,
  },
  eye_icon: {
    padding: 10,
  },
  button_container: {
    width: 250,
    overflow: "hidden",
    padding: 25,
  },
  gradient: {
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  infos_container: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  infos: {
    color: "#fff",
    padding: 5,
  },
  cadastre: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    color: "#fff",
    flex: 1,
    marginLeft: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#E10712",
    backgroundColor: "transparent",
  },
});
