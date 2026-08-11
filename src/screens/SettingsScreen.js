import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [waterSave, setWaterSave] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajustes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* NOTIFICAÇÕES E ECONOMIA */}
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.itemTitle}>Notificações</Text>
              <Text style={styles.itemSubtitle}>Avisos de irrigação e falhas</Text>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: '#CBD5E1', true: '#1B365D' }} />
          </View>

          <View style={[styles.switchRow, { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 }]}>
            <View>
              <Text style={styles.itemTitle}>Modo economia de água</Text>
              <Text style={styles.itemSubtitle}>Reduz o tempo em dias úmidos</Text>
            </View>
            <Switch value={waterSave} onValueChange={setWaterSave} trackColor={{ false: '#CBD5E1', true: '#1B365D' }} />
          </View>
        </View>

        {/* DISPOSITIVO ARDUINO */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="cpu-64-bit" size={20} color="#1B365D" style={{ marginRight: 8 }} />
            <Text style={styles.cardHeaderTitle}>Dispositivo Arduino</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Identificador</Text>
            <Text style={styles.infoValue}>AquaSense-01</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Endereço IP</Text>
            <Text style={styles.infoValue}>192.168.0.42</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sensor de umidade</Text>
            <Text style={styles.infoValue}>Pino A0</Text>
          </View>
        </View>

        {/* OUTROS */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.linkRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="information-circle-outline" size={20} color="#1B365D" style={{ marginRight: 10 }} />
              <Text style={styles.itemTitle}>Sobre o projeto</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.linkRow, { borderTopWidth: 1, borderTopColor: '#F1F5F9' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#1B365D" style={{ marginRight: 10 }} />
              <Text style={styles.itemTitle}>Políticas de privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6F9' },
  header: { backgroundColor: '#1B365D', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  scrollContent: { padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardHeaderTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  itemSubtitle: { fontSize: 11, color: '#64748B', marginTop: 2 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  infoLabel: { fontSize: 13, color: '#64748B' },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  logoutBtn: { backgroundColor: '#FEE2E2', height: 48, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  logoutText: { color: '#EF4444', fontWeight: 'bold', fontSize: 14 },
});