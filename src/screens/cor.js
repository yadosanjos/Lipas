import React, { useState, useEffect} from 'react';
import {
  Inter_700Bold,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import {
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
} from '@expo-google-fonts/dm-serif-display';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { View, Text, TouchableOpacity, StyleSheet, Modal, Switch } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ColorCorrectionScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false); // Switch para ativar/desativar correção de cor
  const [modalVisible, setModalVisible] = useState(false); // Modal de seleção de modo
  const [selectedMode, setSelectedMode] = useState('Modo monocromático'); // Modo selecionado

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const modes = [
    'Modo monocromático',
    'Deuteranomalia (vermelho-verde)',
    'Protanomalia (vermelho-verde)',
    'Tritanomalia (azul-amarelo)',
  ];
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_700Bold,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_400Regular,
          DMSerifDisplay_400Regular,
          DMSerifDisplay_400Regular_Italic,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      </View>

      {/* Switch de correção de cor */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Usar correção de cor</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#8B0000" }}
          thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Modo de correção de cor */}
      <TouchableOpacity style={styles.correctionModeContainer} onPress={() => setModalVisible(true)}>
        <FontAwesome name="eye" size={30} color="#49070A" />
        <View style={styles.correctionModeTextContainer}>
          <Text style={styles.correctionModeText}>Modo de correção</Text>
          <Text style={styles.selectedModeText}>{selectedMode}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={35} color="#49070A" />
      </TouchableOpacity>

      {/* Modal de seleção de modo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Modo de correção</Text>
            {modes.map((mode, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioButton}
                onPress={() => {
                  setSelectedMode(mode);
                  setModalVisible(false);
                }}
              >
                <View style={styles.radioCircle}>
                  {selectedMode === mode && <View style={styles.selectedRadioCircle} />}
                </View>
                <Text style={styles.radioText}>{mode}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE3',
    padding: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#640F14',
    borderRadius: 1, 
  },
  switchText: {
    fontSize: 20,
    color: '#FFEDE3',
    fontFamily: 'Inter_500Medium',
  },
  correctionModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  correctionModeTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  correctionModeText: {
    fontSize: 20,
    fontFamily: ' Inter_700Bold',
    color: '#49070A',
  },
  selectedModeText: {
    fontSize: 13,
    color: '#49070A',
    fontFamily: 'Inter_500Medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#FFEDE3',
    borderRadius: 34,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
    color: '#49070A',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B0000',
  },
  radioText: {
    fontSize: 16,
    color: '#49070A'
  },
  cancelButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B0000',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#8B0000',
  },
});
export default ColorCorrectionScreen;