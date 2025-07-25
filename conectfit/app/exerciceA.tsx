import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Exercicio {
  id: string;
  nome: string;
  series: number;
  repeticoes: string;
  imagem: string;
}

const exerciciosData: Exercicio[] = [
  {
    id: "1",
    nome: "Voador / Peck Deck",
    series: 4,
    repeticoes: "x10",
    imagem: require("../assets/images/voador.png"),
  },
  {
    id: "2",
    nome: "Tríceps Corda no Cross Over",
    series: 4,
    repeticoes: "x10",
    imagem: require("../assets/images/triceps.png"),
  },
  {
    id: "3",
    nome: "Abdominal Prancha",
    series: 3,
    repeticoes: "1:00",
    imagem: require("../assets/images/abdominal.png"),
  },
  {
    id: "4",
    nome: "Mesa Flexora",
    series: 4,
    repeticoes: "x10",
    imagem: require("../assets/images/mesa.png"),
  },
  {
    id: "5",
    nome: "Elevação Lateral",
    series: 4,
    repeticoes: "x10",
    imagem: require("../assets/images/elevacao.png"),
  },
  {
    id: "6",
    nome: "Elevação Lateral",
    series: 4,
    repeticoes: "x10",
    imagem: require("../assets/images/elevacao2.png"),
  },
];

export default function TreinoScreen() {
  const navigation = useNavigation();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tempo, setTempo] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [seriesFeitas, setSeriesFeitas] = useState<Record<string, number>>({});
  const [finalizados, setFinalizados] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const carregarEstado = async () => {
        const salvo = await AsyncStorage.getItem("estado_treino");
        if (salvo) {
          const estado = JSON.parse(salvo);
          setSelectedId(estado.selectedId);
          setTempo(estado.tempo);
          setRodando(estado.rodando);
          setSeriesFeitas(estado.seriesFeitas || {});
          setFinalizados(estado.finalizados || []);
        }
      };
      carregarEstado();
    }, [])
  );

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (rodando) {
      intervalo = setInterval(() => {
        setTempo((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [rodando]);

  useEffect(() => {
    const salvarEstado = async () => {
      await AsyncStorage.setItem(
        "estado_treino",
        JSON.stringify({ selectedId, finalizados, tempo, rodando })
      );
    };
    salvarEstado();
  }, [selectedId, finalizados, tempo, rodando]);

  const iniciarExercicio = (id: string) => {
    if (id === selectedId) return; // impedir reset do tempo
    if (finalizados.includes(id)) return; // não reiniciar exercício finalizado

    setSelectedId(id);
    setTempo(0);
    setRodando(true);
  };

  const finalizarSerie = () => {
    if (!selectedId) return;

    const feitas = seriesFeitas[selectedId] || 0;
    const total =
      exerciciosData.find((ex) => ex.id === selectedId)?.series || 0;
    const novasSeries = { ...seriesFeitas, [selectedId]: feitas + 1 };

    if (feitas + 1 >= total) {
      setFinalizados((prev) => [...prev, selectedId]);
      setSelectedId(null);
      setRodando(false);
    }

    setSeriesFeitas(novasSeries);
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const renderCard = (item: Exercicio) => {
    let corStatus = "#ccc";
    if (item.id === selectedId) {
      corStatus = "yellow";
    } else if (finalizados.includes(item.id)) {
      corStatus = "green";
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => iniciarExercicio(item.id)}
      >
        <Image source={item.imagem} style={styles.imagem} />
        <View style={styles.info}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.detalhes}>{item.series} Séries</Text>
          <Text style={styles.detalhes}>{item.repeticoes} Repetições</Text>
          {seriesFeitas[item.id] ? (
            <Text style={styles.detalhes}>
              Séries feitas: {seriesFeitas[item.id]}/{item.series}
            </Text>
          ) : null}
        </View>
        <View style={[styles.statusBolinha, { backgroundColor: corStatus }]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"<"} Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Treino A</Text>
        <Text style={styles.timer}>{formatarTempo(tempo)}</Text>
      </View>

      <ScrollView>{exerciciosData.map(renderCard)}</ScrollView>

      <TouchableOpacity
        style={styles.botaoFinalizar}
        onPress={finalizarSerie}
        disabled={!selectedId}
      >
        <Text style={styles.textoBotao}>Finalizar Série</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    margin: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    color: "#fff",
    fontSize: 16,
  },
  timer: {
    color: "#fff",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  detalhes: {
    fontSize: 14,
    color: "#666",
  },
  statusBolinha: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  botaoFinalizar: {
    marginTop: 16,
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
