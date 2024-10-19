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
  DMSerifDisplay_700Bold,
} from '@expo-google-fonts/dm-serif-display';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, TouchableWithoutFeedback, Button  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones no rodapé e avaliação

const FeedbackScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSendFeedback = () => {
    if (feedback.trim() === '' || rating === 0) {
      setModalVisible(true);
    } else {
      setModalVisible(true);
      setFeedback(''); // Limpa o campo de feedback
      setRating(0); // Reseta as estrelas
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={[styles.star, { color: i <= rating ? '#7C1C1C' : '#CCCCCC',}]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };
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
      {/* Texto explicativo */}
      <Text style={styles.instructions}>
        Escreva na caixa abaixo sua experiência, problemas, sugestões de melhoria ou qualquer informação que considerar relevante para melhorar nossos serviços e tornar o Lipa's melhor.
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Digite seu feedback aqui"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Seção de Avaliação */}
      <Text style={styles.ratingTitle}>NOS AVALIE!</Text>
      <Text style={styles.ratingSubtitle}>Deixe a sua avaliação da sua experiência no Lipa's</Text>
      
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
            <Image source={require('../assets/icon/borb 2-icon.png')} style={styles.borb} />
              {feedback.trim() === '' || rating === 0 ? (
                <Text style={styles.modalText}>Por favor, insira feedback e uma nota.</Text>
              ) : (
                <Text style={styles.Text}>
                  Obrigado pelo seu feedback!{"\n"}Nota: {rating}{"\n"}Comentário: {feedback}
                </Text>
              )}
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Botão de Enviar */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSendFeedback}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E4E1',
    padding: 20,
  },
  instructions: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center',
    color: '#7C1C1C',
    fontFamily: 'Inter_500Medium',
  },
  textInput: {
    marginTop: 20,
    borderColor: '#7C1C1C',
    borderWidth: 2,
    borderRadius: 13,
    padding: 20,
    backgroundColor: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  ratingTitle: {
    marginTop: 33,
    fontSize: 24,
    fontFamily: 'DMSerifDisplay_400Regular',
    textAlign: 'center',
    color: '#7C1C1C',
    marginVertical: 1,
  },
  ratingSubtitle: {
    fontSize: 21,
    textAlign: 'center',
    marginVertical: 1,
    marginBottom: 13,
    color: '#7C1C1C',
    fontWeight: 'light',
    fontFamily: 'Inter_500Medium',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#631C1C',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 105,
    marginTop: 36,
    },
      submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Inter_700Bold',
      textAlign: 'center',
    },
    container2: {
      backgroundColor: '#FFEDE3',
      width: '100%',
      height: 450,
      borderWidth: 2,
      borderColor: '#640F1480',
      marginTop: 420,
      borderRadius: 50,
      position: 'absolute',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 15,
      backgroundColor: '#F5E4E1',
      borderRadius: 50,
      alignItems: 'center',
      borderColor: '#7C1C1C',
      borderWidth: 2,
    },
    modalText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Inter_700Bold',
      color: '#640F14',
    },
    borb: {
      width: 150,
      height: 140,
      marginVertical: 20,
      marginRight: 20,
      alignItems: 'center',
    },
    Text: {
      fontSize: 23,
      textAlign: 'center',
      fontFamily: 'Inter_700Bold',
      color: '#640F14',
    },
    button:{
      borderColor: '#631C1C',
      borderWidth: 1,
      marginHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 130,
      paddingVertical: 22,
      paddingHorizontal: 17,
      borderRadius: 19,
    },
    close:{
      backgroundColor: '#49070A',
      paddingVertical: 3,
      paddingRight: 22,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 6,
    },
});
export default FeedbackScreen;
