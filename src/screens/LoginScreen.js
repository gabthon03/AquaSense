import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eycjeuuxgqfzomegqczn.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Y2pldXV4Z3Fmem9tZWdxY3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1Mzk2NDEsImV4cCI6MjA5NzExNTY0MX0.5UdwuE2DMDHLfXrhT1_BXKnwk-ZhH-J1X50hTPNjgMw'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginScreen({ onLoginSuccess }) {
  const [criarConta, setCriarConta] = useState(false);
  const [esqueciSenha, setEsqueciSenha] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleAcaoPrincipal = async () => {
    const emailDigitado = email.trim().toLowerCase();

    if (esqueciSenha) {
      if (!emailDigitado) return Alert.alert('Erro', 'Digite o seu e-mail.');
      Alert.alert('Sucesso', `E-mail de recuperação enviado para: ${emailDigitado}`);
      setEsqueciSenha(false);
      return;
    }

    if (criarConta) {
      if (!nome.trim() || !emailDigitado || !senha.trim()) {
        return Alert.alert('Erro', 'Preencha todos os campos.');
      }
      const { error } = await supabase
        .from('registro')
        .insert([{ nome: nome.trim(), email: emailDigitado, senha: senha }]);

      if (error) {
        Alert.alert('Erro ao cadastrar', 'Problema no cadastro ou e-mail já existente.');
      } else {
        Alert.alert('Sucesso', 'Conta criada com sucesso! Faça o login.');
        setCriarConta(false);
        setNome(''); setEmail(''); setSenha('');
      }
      return;
    }

    if (!emailDigitado || !senha.trim()) return Alert.alert('Erro', 'Preencha todos os campos.');

    const { data, error } = await supabase
      .from('registro')
      .select('*')
      .eq('email', emailDigitado)
      .single();

    if (error || !data) return Alert.alert('Erro', 'E-mail não encontrado.');

    if (data.senha === senha) {
      onLoginSuccess();
    } else {
      Alert.alert('Erro', 'Senha incorreta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoArea}>
        <Image source={require('../../assets/aquasense.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>
        {criarConta ? 'Criar Conta' : esqueciSenha ? 'Recuperar Senha' : 'Faça seu Login'}
      </Text>

      {criarConta && (
        <TextInput placeholder="Nome" placeholderTextColor="#777" style={styles.input} value={nome} onChangeText={setNome} />
      )}

      {!esqueciSenha && (
        <TextInput placeholder="Email" placeholderTextColor="#777" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      )}

      {!esqueciSenha && (
        <TextInput placeholder="Senha" placeholderTextColor="#777" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />
      )}

      {esqueciSenha && (
        <TextInput placeholder="Email de recuperação" placeholderTextColor="#777" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      )}

      {!criarConta && !esqueciSenha && (
        <TouchableOpacity onPress={() => setEsqueciSenha(true)} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAcaoPrincipal}>
        <Text style={styles.buttonText}>{criarConta ? 'CADASTRAR' : esqueciSenha ? 'RECUPERAR' : 'ENTRAR'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCriarConta(!criarConta)}>
        <Text style={styles.switchText}>
          {criarConta ? 'Já tenho conta? Entrar' : 'Não tem conta? Criar conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', alignItems: 'center' },
  logoArea: { marginTop: 60, marginBottom: 20 },
  logo: { width: 200, height: 90 },
  title: { fontSize: 24, marginBottom: 20, color: '#333', fontWeight: 'bold' },
  input: { width: '90%', height: 50, backgroundColor: '#E9ECEF', borderRadius: 25, marginBottom: 12, paddingHorizontal: 20, fontSize: 16, color: '#333' },
  forgotContainer: { width: '85%', alignItems: 'flex-start', marginBottom: 15 },
  forgotText: { color: '#0d47a1', fontSize: 14, fontWeight: '500' },
  button: { backgroundColor: '#1E3A8A', width: '90%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  switchText: { marginTop: 20, color: '#555', fontSize: 14, fontWeight: '500' },
});