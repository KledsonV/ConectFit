import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import QRCode from 'react-native-qrcode-svg';  // Certifique-se de instalar a biblioteca 'react-native-qrcode-svg'

export default function PaymentsScreen() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState('');

  const handleBoletoPress = () => {
    setQRCodeValue("Ismael Rodrigues | CPF: 123.456.789-00"); // Adiciona o CPF fictício no QR Code
    setShowQRCode(true); // Exibe o QR Code quando o boleto for clicado
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false); // Fecha o QR Code
    setQRCodeValue(''); // Limpa o valor do QR Code
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF0000", "#B22222"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.navbar}>
          <Link href={"/home-screen"}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </Link>
          <Text style={styles.navbarText}>Pagamentos</Text>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
          />
        </View>
        <HorizontalEvaluation />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.monthsContainer}>
          {["Junho", "Julho", "Agosto"].map((month, index) => (
            <Pressable key={index} style={styles.monthButton}>
              <Text style={styles.monthText}>{month}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.paymentStatus}>
          Estado do pagamento: <Text style={styles.paid}>PAGO</Text>
        </Text>

        <Text style={styles.receiptText}>Acesse aqui o comprovante</Text>
        <FontAwesome
          name="file-text-o"
          size={80}
          color="#fff"
          style={styles.receiptIcon}
        />

        {/* Boleto clicável e estilizado */}
        <Pressable onPress={handleBoletoPress} style={styles.boletoContainer}>
          <View style={styles.boletoContent}>
            <FontAwesome
              name="barcode"
              size={40}
              color="#fff"
              style={styles.boletoIcon}
            />
            <Text style={styles.boletoText}>
              Boleto prestes a vencer! Pague até: 30/06/2025
            </Text>
            <Text style={styles.boletoSubText}>Clique aqui para gerar o QR Code</Text>
          </View>
        </Pressable>

        {/* Modal do QR Code */}
        {showQRCode && (
          <Modal
            visible={showQRCode}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCloseQRCode}
          >
            <View style={styles.modalContainer}>
              <View style={styles.qrCard}>
                <QRCode value={qrCodeValue} size={200} />
                <Text style={styles.qrText}>Válido até: 30/06/2025</Text>
                <Text style={styles.qrText}>Chave PIX (CPF): 123.456.789-00</Text>
                <Pressable onPress={handleCloseQRCode} style={styles.closeButton}>
                  <Text style={styles.closeText}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}

const HorizontalEvaluation = () => {
  return (
    <View style={styles.containerEv}>
      <View style={[styles.pill, styles.firstPill]}>
        <LinearGradient
          colors={["#FFFFFF", "#FFFFFF"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.pillText, { color: "#000" }]}>⛔ Em Aberto</Text>
        </LinearGradient>
      </View>

      <View style={[styles.pill, styles.secondPill]}>
        <LinearGradient
          colors={["#438D48", "#438D48"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Link href={"/paid-screen"}>
            <Text style={styles.pillText}>✅ Pagos</Text>
          </Link>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  containerEv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
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
  monthsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  monthButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  monthText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  paymentStatus: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  paid: {
    color: "#32CD32",
    fontWeight: "bold",
  },
  receiptText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  receiptIcon: {
    alignSelf: "center",
    marginVertical: 20,
  },
  boletoContainer: {
    backgroundColor: "#FF6347", // Boleto vermelho
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#D74B37",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  boletoContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  boletoIcon: {
    marginRight: 10,
  },
  boletoText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
    padding: 10
  },
  boletoSubText: {
    color: "#fff",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  qrCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    width: 250,
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 8,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  qrText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  pill: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  firstPill: {
    backgroundColor: "#F5F5F5",
  },
  secondPill: {
    backgroundColor: "#438D48",
  },
  gradient: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});

