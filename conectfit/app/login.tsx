import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
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
import Feather from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
import api from "./services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [text, onChangeText] = useState("");
  const [password, onChangePassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!text || !password) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos",
      });
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: text,
        password: password,
      });

      await AsyncStorage.setItem("token", response.data.access_token);

      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso!",
      });

      setTimeout(() => {
        router.push("/home-screen");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      
      // console.error("Erro no login:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error.response?.data?.message || "Verifique suas credenciais",
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
            <Text style={styles.login_text}>Login</Text>
            <View style={styles.input_container}>
              <Text style={styles.text_input}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />
              <Text style={styles.text_input}>Senha</Text>
              <View style={styles.password_container}>
                <TextInput
                  style={styles.input_password}
                  onChangeText={onChangePassword}
                  value={password}
                  secureTextEntry={!isPasswordVisible}
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
              <Pressable style={styles.button_container} onPress={handleLogin}>
                <LinearGradient
                  colors={["#752222", "#E10712"]}
                  style={styles.gradient}
                >
                  <Text style={styles.text}>Entrar</Text>
                </LinearGradient>
              </Pressable>
              <View style={styles.infos_container}>
                <Link href="/forget" asChild>
                  <Pressable>
                    <Text style={styles.infos}>Esqueceu a senha?</Text>
                  </Pressable>
                </Link>
                <Link href="/cadastre" asChild>
                  <Pressable>
                    <Text style={styles.infos}>
                      Não tem cadastro?{" "}
                      <Text style={styles.cadastre}>Cadastre-se</Text>
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Toast />
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
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  form_container: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  login_text: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    padding: 30,
  },
  input_container: {
    width: "100%",
    alignItems: "center",
  },
  text_input: {
    color: "#fff",
    alignSelf: "flex-start",
    padding: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    color: "#000",
    padding: 10,
  },
  password_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  input_password: {
    flex: 1,
    color: "#000",
    paddingVertical: 10,
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
  },
  infos: {
    color: "#fff",
    padding: 5,
  },
  cadastre: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
});
