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
    backgroundColor: '#c8edf5',
    alignItems: 'center',
  },

  logoArea: {
    marginTop: 120,
    marginBottom: 120,
  },

  logo: {
    width: 220,
    height: 120,
  },

  title: {
    fontSize: 38,
    marginBottom: 40,
    color: '#000',
    fontWeight: '400',
  },

  input: {
    width: '90%',
    height: 65,

    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 40,

    marginBottom: 25,
    paddingHorizontal: 20,

    fontSize: 22,
    backgroundColor: 'transparent',
  },

  button: {
    marginTop: 10,

    backgroundColor: '#2196f3',

    width: 140,
    height: 55,

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
});
