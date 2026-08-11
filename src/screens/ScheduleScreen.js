import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ScheduleScreen() {
  const [duration, setDuration] = useState(10);
  const [selectedDays, setSelectedDays] = useState(['Seg', 'Qua', 'Sex']);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [cancelRain, setCancelRain] = useState(true);

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    Alert.alert('Sucesso', 'Programação salva com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Programação</Text>
        <Text style={styles.headerSubtitle}>Configure a rotina de irrigação</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* DURAÇÃO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Duração da irrigação</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setDuration(Math.max(1, duration - 1))}
            >
              <Text style={styles.counterBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>
              {duration} <Text style={styles.unitText}>min</Text>
            </Text>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setDuration(duration + 1)}
            >
              <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HORÁRIO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Horário de início</Text>
          <View style={styles.inputFake}>
            <Text style={styles.inputText}>18:00</Text>
            <Ionicons name="time-outline" size={20} color="#64748B" />
          </View>
        </View>

        {/* DIAS DA SEMANA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dias da semana</Text>
          <View style={styles.daysRow}>
            {daysOfWeek.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayBadge, isSelected && styles.dayBadgeSelected]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* OPÇÕES AUTOMÁTICAS */}
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchTitle}>Programação automática</Text>
              <Text style={styles.switchSubtitle}>O Arduino executa a rotina sem intervenção</Text>
            </View>
            <Switch
              value={autoSchedule}
              onValueChange={setAutoSchedule}
              trackColor={{ false: '#CBD5E1', true: '#1B365D' }}
            />
          </View>

          <View style={[styles.switchRow, { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchTitle}>Cancelar se houver chuva</Text>
              <Text style={styles.switchSubtitle}>Usa a previsão do tempo para economizar água</Text>
            </View>
            <Switch
              value={cancelRain}
              onValueChange={setCancelRain}
              trackColor={{ false: '#CBD5E1', true: '#1B365D' }}
            />
          </View>
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Salvar programação</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6F9' },
  header: { backgroundColor: '#1B365D', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 13, color: '#93C5FD', marginTop: 2 },
  scrollContent: { padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 15 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginBottom: 12 },
  counterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center' },
  counterBtnText: { fontSize: 22, fontWeight: 'bold', color: '#0284C7' },
  counterValue: { fontSize: 28, fontWeight: 'bold', color: '#1E293B' },
  unitText: { fontSize: 14, color: '#64748B', fontWeight: 'normal' },
  inputFake: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  inputText: { fontSize: 16, color: '#1E293B' },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  dayBadgeSelected: { backgroundColor: '#1B365D' },
  dayText: { fontSize: 12, color: '#64748B' },
  dayTextSelected: { color: '#FFF', fontWeight: 'bold' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
  switchTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  switchSubtitle: { fontSize: 11, color: '#64748B', marginTop: 2 },
  saveBtn: { backgroundColor: '#1B365D', height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});