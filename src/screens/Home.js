import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ onLogout }) {
  const [iaModalVisible, setIaModalVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [historicoChat, setHistoricoChat] = useState([
    { id: '1', tipo: 'ia', texto: 'Olá! Sou o assistente agronômico do AquaSense. Como posso ajudar com a irrigação ou saúde das suas plantas hoje? Você pode digitar sua dúvida ou enviar uma foto.' }
  ]);

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;

    const novaMensagemUsuario = { id: Date.now().toString(), tipo: 'usuario', texto: mensagem };
    setHistoricoChat(prev => [...prev, novaMensagemUsuario]);
    const textoAtual = mensagem;
    setMensagem('');

    // Simulação de resposta da IA (aqui você poderá plugar sua API de IA futuramente)
    setTimeout(() => {
      let respostaIa = 'Analisei sua solicitação sobre as plantas. Mantenha o solo monitorado.';
      if (textoAtual.toLowerCase().includes('irrigação') || textoAtual.toLowerCase().includes('agua')) {
        respostaIa = 'Para o nível atual de umidade, recomendo manter a irrigação automatizada nos horários mais frescos do dia (manhã ou final da tarde).';
      } else if (textoAtual.toLowerCase().includes('amarela') || textoAtual.toLowerCase().includes('folha')) {
        respostaIa = 'Folhas amareladas podem indicar excesso de água ou falta de nutrientes específicos no solo. Tente enviar uma foto para uma análise detalhada.';
      }

      const novaMensagemIa = { id: (Date.now() + 1).toString(), tipo: 'ia', texto: respostaIa };
      setHistoricoChat(prev => [...prev, novaMensagemIa]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.dashboardSafeArea}>
      <ScrollView contentContainerStyle={styles.dashboardScroll} showsVerticalScrollIndicator={false}>
        
        {/* HEADER AZUL MARINHO */}
        <View style={styles.dashHeader}>
          <View style={styles.dashHeaderTop}>
            <View>
              <Text style={styles.dashWelcome}>BEM-VINDO</Text>
              <Text style={styles.dashTitle}>Minha horta</Text>
            </View>
            
            <View style={styles.dashLogoBadge}>
              <Text style={styles.dashLogoText}>Aqua</Text>
              <Text style={styles.dashLogoSubtext}>SENSE</Text>
            </View>
          </View>

          {/* CARD HERO */}
          <View style={styles.dashHeroCard}>
            <View style={styles.dashStatusRow}>
              <View style={styles.dashStatusDot} />
              <Text style={styles.dashStatusText}>Sistema em espera</Text>
            </View>
            <Text style={styles.dashTimerText}>00:00</Text>
            <Text style={styles.dashTimerSubtext}>Tempo desta irrigação</Text>
          </View>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.dashActionsContainer}>
          <TouchableOpacity style={[styles.dashActionButton, styles.dashStartButton]}>
            <Ionicons name="play" size={18} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={styles.dashButtonText}>Iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dashActionButton, styles.dashStopButton]}>
            <Ionicons name="square" size={16} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={styles.dashButtonText}>Interromper</Text>
          </TouchableOpacity>
        </View>

        {/* GRID DE MÉTRICAS */}
        <View style={styles.dashGrid}>
          <View style={styles.dashMetricCard}>
            <View style={styles.dashIconCircle}>
              <MaterialCommunityIcons name="water-outline" size={22} color="#1B365D" />
            </View>
            <Text style={styles.dashMetricLabel}>Umidade do solo</Text>
            <Text style={styles.dashMetricValue}>42%</Text>
          </View>

          <View style={styles.dashMetricCard}>
            <View style={styles.dashIconCircle}>
              <Ionicons name="thermometer-outline" size={22} color="#1B365D" />
            </View>
            <Text style={styles.dashMetricLabel}>Temperatura</Text>
            <Text style={styles.dashMetricValue}>27 °C</Text>
          </View>

          <View style={styles.dashMetricCard}>
            <View style={styles.dashIconCircle}>
              <Ionicons name="speedometer-outline" size={22} color="#1B365D" />
            </View>
            <Text style={styles.dashMetricLabel}>Vazão da bomba</Text>
            <Text style={styles.dashMetricValue}>1,8 L/min</Text>
          </View>

          <View style={styles.dashMetricCard}>
            <View style={styles.dashIconCircle}>
              <Ionicons name="time-outline" size={22} color="#1B365D" />
            </View>
            <Text style={styles.dashMetricLabel}>Próxima irrigação</Text>
            <Text style={styles.dashMetricValue}>18:00</Text>
          </View>
        </View>

        {/* INFORMAÇÕES GERAIS */}
        <View style={styles.dashInfoCard}>
          <Text style={styles.dashInfoTitle}>Informações gerais</Text>

          <View style={styles.dashInfoRow}>
            <Text style={styles.dashInfoLabel}>Dispositivo</Text>
            <Text style={styles.dashInfoValue}>Arduino UNO • AquaSense-01</Text>
          </View>

          <View style={styles.dashInfoRow}>
            <Text style={styles.dashInfoLabel}>Conexão</Text>
            <Text style={styles.dashInfoValue}>Wi-Fi local</Text>
          </View>

          <View style={styles.dashInfoRow}>
            <Text style={styles.dashInfoLabel}>Modo</Text>
            <Text style={styles.dashInfoValue}>Automático programado</Text>
          </View>

          <View style={styles.dashInfoRow}>
            <Text style={styles.dashInfoLabel}>Última irrigação</Text>
            <Text style={styles.dashInfoValue}>Hoje, 07:30 (10 min)</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTÃO FLUTUANTE DA IA */}
      <TouchableOpacity 
        style={styles.fabAi} 
        onPress={() => setIaModalVisible(true)}
      >
        <Ionicons name="sparkles" size={22} color="#FFF" />
        <Text style={styles.fabAiText}>IA Plantas</Text>
      </TouchableOpacity>

      {/* MODAL DO CHAT IA */}
      <Modal visible={iaModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="sparkles" size={20} color="#2563EB" style={{ marginRight: 8 }} />
              <Text style={styles.modalTitle}>Assistente Agrônomo IA</Text>
            </View>
            <TouchableOpacity onPress={() => setIaModalVisible(false)}>
              <Ionicons name="close-circle" size={28} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
            {historicoChat.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.chatBubble, 
                  item.tipo === 'usuario' ? styles.bubbleUsuario : styles.bubbleIa
                ]}
              >
                <Text style={[styles.bubbleText, item.tipo === 'usuario' ? styles.textUsuario : styles.textIa]}>
                  {item.texto}
                </Text>
              </View>
            ))}
          </ScrollView>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={10}>
            <View style={styles.chatInputContainer}>
              <TouchableOpacity style={styles.chatCameraButton} onPress={() => alert('Abrir câmera/galeria para enviar foto da planta!')}>
                <Ionicons name="camera-outline" size={22} color="#2563EB" />
              </TouchableOpacity>
              
              <TextInput
                style={styles.chatInput}
                placeholder="Digite sua dúvida sobre irrigação..."
                placeholderTextColor="#94A3B8"
                value={mensagem}
                onChangeText={setMensagem}
              />

              <TouchableOpacity style={styles.chatSendButton} onPress={enviarMensagem}>
                <Ionicons name="send" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dashboardSafeArea: { flex: 1, backgroundColor: '#1B365D' },
  dashboardScroll: { backgroundColor: '#F3F6F9', flexGrow: 1, paddingBottom: 80 },
  dashHeader: { backgroundColor: '#1B365D', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  dashHeaderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  dashWelcome: { color: '#93C5FD', fontSize: 12, fontWeight: '700' },
  dashTitle: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' },
  dashLogoBadge: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  dashLogoText: { color: '#1B365D', fontWeight: 'bold', fontSize: 12 },
  dashLogoSubtext: { color: '#1B365D', fontSize: 6, fontWeight: 'bold' },
  dashHeroCard: { backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 20, padding: 20 },
  dashStatusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dashStatusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#94A3B8', marginRight: 8 },
  dashStatusText: { color: '#E2E8F0', fontSize: 14 },
  dashTimerText: { color: '#FFF', fontSize: 42, fontWeight: 'bold' },
  dashTimerSubtext: { color: '#94A3B8', fontSize: 12 },
  dashActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: -25, marginBottom: 15 },
  dashActionButton: { flex: 0.48, height: 50, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  dashStartButton: { backgroundColor: '#2563EB' },
  dashStopButton: { backgroundColor: '#F47174' },
  dashButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  dashGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  dashMetricCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 15 },
  dashIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  dashMetricLabel: { fontSize: 12, color: '#64748B', marginBottom: 4 },
  dashMetricValue: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  dashInfoCard: { backgroundColor: '#FFF', borderRadius: 20, marginHorizontal: 20, padding: 20 },
  dashInfoTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 15 },
  dashInfoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dashInfoLabel: { fontSize: 14, color: '#64748B' },
  dashInfoValue: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  fabAi: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 30, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  fabAiText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8, fontSize: 14 },
  modalContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B365D' },
  chatScroll: { padding: 16, flexGrow: 1 },
  chatBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 12 },
  bubbleIa: { backgroundColor: '#FFF', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#E2E8F0' },
  bubbleUsuario: { backgroundColor: '#2563EB', alignSelf: 'flex-end' },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  textIa: { color: '#1E293B' },
  textUsuario: { color: '#FFF' },
  chatInputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  chatCameraButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  chatInput: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 16, height: 44, fontSize: 14, color: '#1E293B' },
  chatSendButton: { width: 40, height: 40, backgroundColor: '#2563EB', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }
});