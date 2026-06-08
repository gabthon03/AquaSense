import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

export default function App() {

  const [criarConta, setCriarConta] = useState(false);
  const [esqueciSenha, setEsqueciSenha] = useState(false);
  const [logado, setLogado] = useState(false);







  // =========================
  //  tela inicial
  // =========================
  if (logado) {
    return (
      <SafeAreaView style={styles.container}>

        <Text style={styles.homeTitle}>AquaSense Dados💧</Text>

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
            <Text style={styles.cardValue}>Ensolarado ☀️ 32°C</Text>
          </View>

          <View style={styles.cardFull}>
            <Text style={styles.cardTitle}>Tempo de Irrigação</Text>
            <Text style={styles.cardValueBig}>25 minutos</Text>
          </View>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setLogado(false)}
        >
          <Text style={styles.buttonText}>SAIR</Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }




  // =========================
  //  login e cadastro
  // =========================
  return (
    <SafeAreaView style={styles.container}>

      {/* Logo */}
      <View style={styles.logoArea}>
        <Image
          source={require('../../assets/aquasense.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>
        {criarConta ? 'Criar Conta' : esqueciSenha ? 'Recuperar Senha' : 'Faça seu Login'}
      </Text>

      {/* Nome (cadastro) */}
      {criarConta && (
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#555"
          style={styles.input}
        />
      )}

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#555"
        style={styles.input}
      />

      {/* Senha */}
      {!esqueciSenha && (
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#555"
          secureTextEntry
          style={styles.input}
        />
      )}

      {/* Recuperação */}
      {esqueciSenha && (
        <TextInput
          placeholder="Email de recuperação"
          placeholderTextColor="#555"
          style={styles.input}
        />
      )}

      {/* Esqueceu senha */}
      {!criarConta && !esqueciSenha && (
        <TouchableOpacity
          onPress={() => setEsqueciSenha(true)}
          style={styles.forgotContainer}
        >
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      )}

      {/* BOTÃO PRINCIPAL */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setLogado(true)}
      >
        <Text style={styles.buttonText}>
          {criarConta ? 'CADASTRAR' : esqueciSenha ? 'RECUPERAR' : 'ENTRAR'}
        </Text>
      </TouchableOpacity>

      {/* LINKS */}
      {!esqueciSenha && (
        <TouchableOpacity onPress={() => setCriarConta(!criarConta)}>
          <Text style={{ marginTop: 15, color: '#000' }}>
            {criarConta ? 'Já tenho conta' : 'Criar conta'}
          </Text>
        </TouchableOpacity>
      )}

      {esqueciSenha && (
        <TouchableOpacity onPress={() => setEsqueciSenha(false)}>
          <Text style={{ marginTop: 15, color: '#000' }}>
            Voltar ao login
          </Text>
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ccf4ff',
    alignItems: 'center',
  },

  logoArea: {
    marginTop: 100,
    marginBottom: 50,
  },

  logo: {
    width: 720,
    height: 200,
  },

  title: {
    fontSize: 30,
    marginBottom: 30,
    color: '#000',
    fontWeight: '400',
  },

  input: {
    width: '90%',
    height: 60,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
    marginBottom: 25,
    paddingHorizontal: 20,
    fontSize: 15,
  },

  forgotContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginTop: -15,
    marginBottom: 10,
  },

  forgotText: {
    color: '#0d47a1',
    fontSize: 14,
  },

  button: {
    marginTop: 15,
    backgroundColor: '#2196f3',
    width: 140,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  // =========================
  // informações da tela inicial - css
  // =========================

  homeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color: '#000',
  },

  grid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  cardFull: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  cardValueBig: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196f3',
  },
});