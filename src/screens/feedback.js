import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones no rodapé e avaliação


const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      {/* Texto explicativo */}
      <Text style={styles.instructions}>
        Escreva na caixa abaixo sua experiência, problemas, sugestões de melhoria ou qualquer informação que considerar relevante para melhorar nossos serviços e tornar o Lipa's melhor.
      </Text>

      {/* Caixa de texto para o feedback */}
      <TextInput
        style={styles.textInput}
        placeholder="Digite aqui..."
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
        numberOfLines={4}
      />

      {/* Seção de Avaliação */}
      <Text style={styles.ratingTitle}>NOS AVALIE!</Text>
      <Text style={styles.ratingSubtitle}>Deixe a sua avaliação da sua experiência no Lipa's</Text>
      
      {/* Estrelas de Avaliação */}
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color={star <= rating ? '#7C1C1C' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de Enviar */}
      <TouchableOpacity style={styles.submitButton}>
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
    marginTop: 20,
    fontSize: 22,
    textAlign: 'center',
    color: '#7C1C1C',
    fontWeight: 'light',
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
    fontWeight: 'bold',
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
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#631C1C',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 105,
    marginTop: 45,
    },
      submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
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
});
export default FeedbackScreen;
