import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone do escudo

const Cont3Screen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Botão de Fechar */}
      <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      {/* Ícone de escudo */}
      <Image source={require('../assets/icons/panic-icon.png')} style={styles.icon} />

      {/* Texto de instrução */}
      <Text style={styles.text}>
      Em situações de emergência aperte duas vezes o botão de desligar do seu celular ou aperte duas vezes no ícone de som no menu inferior para acionar o botão pânico.
      </Text>

      {/* Paginação (barras indicativas) */}
      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.activeDot} />
      </View>

      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
        <Text style={styles.buttonText}>Entendi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b000e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 12,
  },
  closeText: {
    color: 'white',
    fontSize: 25,
  },
  icon: {
    marginBottom: 12,
    height: 234,
    marginHorizontal: 239,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#4b000e',
    fontSize: 18,
  },
});
export default Cont3Screen;
