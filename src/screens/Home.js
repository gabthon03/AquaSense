import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';

// 1. CONFIGURAÇÃO DO SUPABASE (Movida para o topo do arquivo)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eycjeuuxgqfzomegqczn.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Y2pldXV4Z3Fmem9tZWdxY3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1Mzk2NDEsImV4cCI6MjA5NzExNTY0MX0.5UdwuE2DMDHLfXrhT1_BXKnwk-ZhH-J1X50hTPNjgMw'; // Use sua chave anônima completa aqui

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {

  const [criarConta, setCriarConta] = useState(false);
  const [esqueciSenha, setEsqueciSenha] = useState(false);
  const [logado, setLogado] = useState(false);

  // === NOVOS ESTADOS PARA CAPTURAR O QUE O USUÁRIO DIGITA ===
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // === FUNÇÃO DE VALIDAÇÃO DO LOGIN / CADASTRO CONECTADA AO SUPABASE ===
  const handleAcaoPrincipal = async () => {
    const emailDigitado = email.trim().toLowerCase();

    // 1. Fluxo de Recuperação de Senha
    if (esqueciSenha) {
      if (!emailDigitado) {
        Alert.alert('Erro', 'Por favor, digite o seu e-mail de recuperação.');
        return;
      }
      Alert.alert('Sucesso', `E-mail de recuperação enviado para: ${emailDigitado}`);
      setEsqueciSenha(false);
      return;
    }

    // 2. Fluxo de Criação de Conta (Salva no Supabase)
    if (criarConta) {
      if (!nome.trim() || !emailDigitado || !senha.trim()) {
        Alert.alert('Erro', 'Preencha todos os campos para se cadastrar.');
        return;
      }

      // Envia os dados para a tabela 'usuarios' do seu Supabase
      const { error } = await supabase
        .from('registro')
        .insert([{ nome: nome.trim(), email: emailDigitado, senha: senha }]);

      if (error) {
        Alert.alert('Erro ao cadastrar', 'Este e-mail já pode estar cadastrado ou ocorreu um problema.');
        console.log(error);
      } else {
        Alert.alert('Sucesso', 'Conta criada! Faça o login.');
        setCriarConta(false);
        setNome('');
        setEmail('');
        setSenha('');
      }
      return;
    }

    // 3. Fluxo de Login (Busca e valida as credenciais no Supabase)
    if (!emailDigitado || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Busca o usuário baseado no e-mail digitado
    const { data, error } = await supabase
      .from('registro')
      .select('*')
      .eq('email', emailDigitado)
      .single();

    if (error || !data) {
      Alert.alert('Erro', 'E-mail não encontrado.');
      return;
    }

    // Compara a senha do banco com a digitada
    if (data.senha === senha) {
      setLogado(true);
    } else {
      Alert.alert('Erro', 'Senha incorreta.');
    }
  };

  // Função auxiliar para limpar os campos ao mudar de tela
  const mudarTela = (acao) => {
    setNome('');
    setEmail('');
    setSenha('');
    acao();
  };

  // =========================
  //  tela inicial
  // =========================
  if (logado) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.homeTitle}>AquaSense Dados</Text>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Umidade do Solo</Text>
            <Text style={styles.cardValue}>68%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pressão dos Canos</Text>
            <Text style={styles.cardValue}>2.3 bar</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Fluxo de Água</Text>
            <Text style={styles.cardValue}>12 L/min</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Clima do Dia</Text>
            <Text style={styles.cardValue}>Ensolarado  32°C</Text>
          </View>

          <View style={styles.cardFull}>
            <Text style={styles.cardTitle}>Tempo de Irrigação</Text>
            <Text style={styles.cardValueBig}>25 minutos</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => mudarTela(() => setLogado(false))}
        >
          <Text style={styles.buttonText}>SAIR</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // =========================
  //  login e cadastro (Interface)
  // =========================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoArea}>
        <Image
          source={require('../../assets/aquasense.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>
        {criarConta ? 'Criar Conta' : esqueciSenha ? 'Recuperar Senha' : 'Faça seu Login'}
      </Text>

      {criarConta && (
        <TextInput
          placeholder="Nome" 
          placeholderTextColor="#555"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      )}

      {!esqueciSenha && (
        <TextInput
          placeholder="Email" 
          placeholderTextColor="#555"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}

      {!esqueciSenha && (
        <TextInput
          placeholder="Senha" 
          placeholderTextColor="#555"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
      )}

      {esqueciSenha && (
        <TextInput
          placeholder="Email de recuperação"
          placeholderTextColor="#555"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}

      {!criarConta && !esqueciSenha && (
        <TouchableOpacity
          onPress={() => mudarTela(() => setEsqueciSenha(true))}
          style={styles.forgotContainer}
        >
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAcaoPrincipal}
      >
        <Text style={styles.buttonText}>
          {criarConta ? 'CADASTRAR' : esqueciSenha ? 'RECUPERAR' : 'ENTRAR'}
        </Text>
      </TouchableOpacity>

      {!esqueciSenha && (
        <TouchableOpacity onPress={() => mudarTela(() => setCriarConta(!criarConta))}>
          <Text style={{ marginTop: 15, color: '#000' }}>
            {criarConta ? 'Já tenho conta' : 'Criar conta'}
          </Text>
        </TouchableOpacity>
      )}

      {esqueciSenha && (
        <TouchableOpacity onPress={() => mudarTela(() => setEsqueciSenha(false))}>
          <Text style={{ marginTop: 15, color: '#000' }}>
            Voltar ao login
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ccf4ff', alignItems: 'center' },
  logoArea: { marginTop: 100, marginBottom: 50 },
  logo: { width: 720, height: 200 },
  title: { fontSize: 30, marginBottom: 30, color: '#000', fontWeight: '400' },
  input: { width: '90%', height: 60, borderWidth: 2, borderColor: '#000', borderRadius: 20, marginBottom: 25, paddingHorizontal: 20, fontSize: 15 },
  forgotContainer: { width: '90%', alignItems: 'flex-start', marginTop: -15, marginBottom: 10 },
  forgotText: { color: '#0d47a1', fontSize: 14 },
  button: { marginTop: 15, backgroundColor: '#2196f3', width: 140, height: 45, borderRadius: 5, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  buttonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  homeTitle: { fontSize: 26, fontWeight: 'bold', marginTop: 40, marginBottom: 20, color: '#000' },
  grid: { width: '90%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, elevation: 4 },
  cardFull: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 4, alignItems: 'center' },
  cardTitle: { fontSize: 14, color: '#555', marginBottom: 8 },
  cardValue: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  cardValueBig: { fontSize: 28, fontWeight: 'bold', color: '#2196f3' },
});