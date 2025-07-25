import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function ForgetPasswordScreen() {
  const [phone, setPhone] = useState("");

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
            <Text style={styles.login_text}>Redefinir Senha</Text>
            <Text style={styles.text_input}>
              Digite seu número para recuperar sua senha:
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setPhone}
              value={phone}
              placeholder="(DDD) 9XXXX-XXXX"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
            />
            <Link href="/login" asChild>
              <Pressable style={styles.button_container}>
                <LinearGradient
                  colors={["#752222", "#E10712"]}
                  style={styles.gradient}
                >
                  <Text style={styles.text}>Recuperar</Text>
                </LinearGradient>
              </Pressable>
            </Link>
            <View style={styles.infos_container}>
              <Link href="/login" asChild>
                <Pressable>
                  <Text style={styles.infos}>
                    Já tem uma conta?{" "}
                    <Text style={styles.cadastre}>Conecte-se</Text>
                  </Text>
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
    fontSize: 10
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
