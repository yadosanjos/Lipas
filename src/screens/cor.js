import React, { useState, createContext, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Image, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Criação do contexto de acessibilidade
const AccessibilityContext = createContext();
export const AccessibilityProvider = ({ children }) => {
  const [correctionMode, setCorrectionMode] = useState('Modo monocromático'); // Estado para o modo de correção

  return (
    <AccessibilityContext.Provider value={{ correctionMode, setCorrectionMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

// Hook para aplicar estilos com base no modo de correção de cor
const useCorrectionStyles = () => {
  const { correctionMode } = useAccessibility();

  switch (correctionMode) {
    case 'Modo monocromático':
      return { backgroundColor: '#a3a3a3', color: '#333' };
    case 'Deuteranomalia (vermelho-verde)':
      return { backgroundColor: '#FFF5E1', color: '#491A1A' };
    case 'Protanomalia (vermelho-verde)':
      return { backgroundColor: '#E1FFE5', color: '#1A4949' };
    case 'Tritanomalia (azul-amarelo)':
      return { backgroundColor: '#E1E5FF', color: '#1A1A49' };
    default:
      return { backgroundColor: '#FFEDE3', color: '#49070A' }; // Cor padrão
  }
};

// Componente principal da tela de correção de cor
const ColorCorrectionScreen = ({ navigation }) => {
  
  const [isEnabled, setIsEnabled] = useState(false); // Switch para ativar/desativar correção de cor
  const { correctionMode, setCorrectionMode } = useAccessibility(); // Uso do contexto para o modo de correção
  const [modalVisible, setModalVisible] = useState(false); // Modal de seleção de modo
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const Stack = createNativeStackNavigator();
  const modes = [
    'Modo monocromático',
    'Deuteranomalia (vermelho-verde)',
    'Protanomalia (vermelho-verde)',
    'Tritanomalia (azul-amarelo)',
  ];

  // Obtendo os estilos com base no modo de correção de cor
  const correctionStyles = useCorrectionStyles();

  return (
    <View style={[styles.container, { backgroundColor: isEnabled ? correctionStyles.backgroundColor : '#FFEDE3' }]}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Correção de Cor</Text>
        <Image source={require('../assets/borboleta.png')} style={styles.borboleta} />
      </View>

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
          <Text style={[styles.correctionModeText, { color: correctionStyles.color }]}>Modo de correção</Text>
          <Text style={[styles.selectedModeText, { color: correctionStyles.color }]}>{correctionMode}</Text>
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
          <View style={[styles.modalView, { backgroundColor: correctionStyles.backgroundColor }]}>
            <Text style={[styles.modalTitle, { color: correctionStyles.color }]}>Modo de correção</Text>
            {modes.map((mode, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioButton}
                onPress={() => {
                  setCorrectionMode(mode);
                  setModalVisible(false);
                }}
              >
                <View style={[styles.radioCircle, { borderColor: correctionStyles.color }]}>
                  {correctionMode === mode && <View style={[styles.selectedRadioCircle, { backgroundColor: correctionStyles.color }]} />}
                </View>
                <Text style={[styles.radioText, { color: correctionStyles.color }]}>{mode}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={[styles.cancelButtonText, { color: correctionStyles.color }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE3',
  },
  navbar: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#49070A',
    paddingHorizontal: 9,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: 30,
    color: '#FFEDE3',
    fontFamily: 'DMSerifDisplay_400Regular',
    marginRight: 60,
    marginStart: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#DAB8A9',
  },
  switchText: {
    fontSize: 18,
    color: '#49070A',
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
    fontSize: 18,
    color: '#49070A',
    fontFamily: 'Inter_700Bold',
  },
  selectedModeText: {
    fontSize: 14,
    color: '#49070A',
    fontFamily: 'Inter_500Medium',
  },
  borboleta: {
    width: 55,
    height: 55,
    marginStart: 17,
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
    borderRadius: 35,
    padding: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 11,
    color: '#49070A',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 29,
    width: 29,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 15,
  },
  radioText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
  cancelButton: {
    marginTop: 15,
    padding: 6,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    marginStart: 145,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});

// Exportando o provedor de acessibilidade e o componente da tela
export default function AppWrapper() {
  return (
    <AccessibilityProvider>
      <ColorCorrectionScreen />
    </AccessibilityProvider>
  );
}
