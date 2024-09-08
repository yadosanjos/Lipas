import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function BotaoPanicoScreen(){
  return (
    <View style={styles.container}>
      <Text style={styles.home}> Botão Pânico </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#49070A',
    width: '100%',
    height: '100%',
  },
  home: {
    color: '#FFEDE3',
    fontSize: 40,
  },
});

