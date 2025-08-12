import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ProgressBar } from "../../components/ProgressBar";
import { ThemedButton } from "../../components/ThemedButton";

export function Orders() {
  const [p1, setP1] = useState(0);
  const [indeterminateRunning, setIndeterminateRunning] = useState(false);
  const [p3, setP3] = useState(0);

  const determinateTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const bufferTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  async function startDeterminate() {
    if (determinateTimer.current) clearInterval(determinateTimer.current);
    setP1(0);
    determinateTimer.current = setInterval(() => {
      setP1((v) => Math.min(v + 3, 95));
    }, 150);
    try {
      if (determinateTimer.current) clearInterval(determinateTimer.current);
      setP1(100);
    } catch {
      if (determinateTimer.current) clearInterval(determinateTimer.current);
      setP1(0);
    }
  }

  async function startIndeterminate() {
    setIndeterminateRunning(true);
    try {
      await fetch("https://www.google.com/robots.txt");
    } finally {
      setIndeterminateRunning(false);
    }
  }

  async function startBuffer() {
    if (bufferTimer.current) clearInterval(bufferTimer.current);
    setP3(0);
    bufferTimer.current = setInterval(() => {
      setP3((v) => (v >= 100 ? 100 : v + 2.5));
    }, 120);
    try {
      await fetch("https://www.google.com/robots.txt");
      if (bufferTimer.current) clearInterval(bufferTimer.current);
      setP3(100);
    } catch {
      if (bufferTimer.current) clearInterval(bufferTimer.current);
      setP3(0);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tela de Pedidos</ThemedText>
      <View style={{ marginTop: 30 }} />

      <ThemedText style={{ marginBottom: 8 }}>Tradicional (fixo)</ThemedText>
      <ProgressBar
        value={60}
        showMarker
        showLabels
        style={{ marginTop: 8 }}
      />

      <View style={{ height: 24 }} />

      <ThemedText style={{ marginBottom: 8 }}>Determinado</ThemedText>
      <ProgressBar value={p1} showMarker showLabels style={{ marginTop: 8 }} />
      <ThemedButton
        title="Testar fetch (determinado)"
        onPress={startDeterminate}
        buttonStyle={{ marginTop: 8 }}
      />

      <View style={{ height: 24 }} />

      <ThemedText style={{ marginBottom: 8 }}>Indeterminado</ThemedText>
      <ProgressBar
        value={0}
        mode="indeterminate"
        showMarker={false}
        showLabels={false}
        style={{ marginTop: 8, opacity: indeterminateRunning ? 1 : 0.4 }}
      />
      <ThemedButton
        title="Testar fetch (indeterminado)"
        onPress={startIndeterminate}
        buttonStyle={{ marginTop: 8 }}
      />

      <View style={{ height: 24 }} />

      <ThemedText style={{ marginBottom: 8 }}>Buffer</ThemedText>
      <ProgressBar
        value={p3}
        mode="buffer"
        bufferValue={Math.min(100, p3 + 10)}
        showMarker
        style={{ marginTop: 8 }}
      />
      <ThemedButton
        title="Testar fetch (buffer)"
        onPress={startBuffer}
        buttonStyle={{ marginTop: 8 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
