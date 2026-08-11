import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [timer, setTimer] = useState('00:00');

  const handleStart = () => {
    setIsIrrigating(true);
    setTimer('10:00');
  };

  const handleStop = () => {
    setIsIrrigating(false);
    setTimer('00:00');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1B365D" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* HEADER AZUL MARINHO */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>BEM-VINDO</Text>
              <Text style={styles.titleText}>Minha horta</Text>
            </View>
            
            {/* Logo AquaSense Badge */}
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>Aqua</Text>
              <Text style={styles.logoBadgeSubtext}>SENSE</Text>
            </View>
          </View>

          {/* CARD HERO (SISTEMA EM ESPERA / TEMPO) */}
          <View style={styles.heroCard}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: isIrrigating ? '#4ADE80' : '#94A3B8' }]} />
              <Text style={styles.statusText}>
                {isIrrigating ? 'Sistema irrigando...' : 'Sistema em espera'}
              </Text>
            </View>

            <Text style={styles.timerText}>{timer}</Text>
            <Text style={styles.timerSubtext}>Tempo desta irrigação</Text>
          </View>
        </View>

        {/* BOTOES DE AÇÃO */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.startButton]} 
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.stopButton]} 
            onPress={handleStop}
            activeOpacity={0.8}
          >
            <Ionicons name="square" size={18} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.stopButtonText}>Interromper</Text>
          </TouchableOpacity>
        </View>

        {/* GRID DE MÉTRICAS / SENSORES */}
        <View style={styles.gridContainer}>
          {/* Umidade do solo */}
          <View style={styles.metricCard}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="water-outline" size={24} color="#1B365D" />
            </View>
            <Text style={styles.metricLabel}>Umidade do solo</Text>
            <Text style={styles.metricValue}>42%</Text>
          </View>

          {/* Temperatura */}
          <View style={styles.metricCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="thermometer-outline" size={24} color="#1B365D" />
            </View>
            <Text style={styles.metricLabel}>Temperatura</Text>
            <Text style={styles.metricValue}>27 °C</Text>
          </View>

          {/* Vazão da bomba */}
          <View style={styles.metricCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="speedometer-outline" size={24} color="#1B365D" />
            </View>
            <Text style={styles.metricLabel}>Vazão da bomba</Text>
            <Text style={styles.metricValue}>1,8 L/min</Text>
          </View>

          {/* Próxima irrigação */}
          <View style={styles.metricCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="time-outline" size={24} color="#1B365D" />
            </View>
            <Text style={styles.metricLabel}>Próxima irrigação</Text>
            <Text style={styles.metricValue}>18:00</Text>
          </View>
        </View>

        {/* INFORMAÇÕES GERAIS */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Informações gerais</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dispositivo</Text>
            <Text style={styles.infoValue}>Arduino UNO • AquaSense-01</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Conexão</Text>
            <Text style={styles.infoValue}>Wi-Fi local</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Modo</Text>
            <Text style={styles.infoValue}>Automático programado</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Última irrigação</Text>
            <Text style={styles.infoValue}>Hoje, 07:30 (10 min)</Text>
          </View>

          <Text style={styles.disclaimerText}>
            Dados de demonstração. Serão lidos do banco de dados e dos sensores do Arduino na próxima etapa.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1B365D',
  },
  scrollContainer: {
    backgroundColor: '#F3F6F9',
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#1B365D',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 2,
  },
  logoBadge: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBadgeText: {
    color: '#1B365D',
    fontWeight: 'bold',
    fontSize: 13,
  },
  logoBadgeSubtext: {
    color: '#1B365D',
    fontSize: 7,
    fontWeight: 'bold',
    marginTop: -2,
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 56,
  },
  timerSubtext: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -25,
    marginBottom: 15,
  },
  actionButton: {
    flex: 0.48,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButton: {
    backgroundColor: '#2563EB',
  },
  stopButton: {
    backgroundColor: '#F47174',
  },
  buttonIcon: {
    marginRight: 6,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 15,
    lineHeight: 18,
  },
});