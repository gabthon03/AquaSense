import React from 'react';
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
      <Text style={styles.title}>Faça seu Login</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#555"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#555"
        secureTextEntry
        style={styles.input}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>









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
    backgroundColor: 'transparent',
  },

  button: {
    marginTop: 15,

    backgroundColor: '#2196f3',

    width: 140,
    height: 45,

    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
