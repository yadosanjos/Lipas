import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';

const ConfigScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
   </View>
   </View>
     <View style={styles.section}>
        <Text style={styles.Title}>Acessibilidade</Text>
</View>

        <View style={styles.settingItem}>
        <Image source={require('../assets/icons/font-icon.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>Tamanho da fonte</Text>
          <Text style={styles.optionStatus}>Padrão</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Fontsize')}>
        <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <Image source={require('../assets/icons/display-icon.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>Tamanho da exibição</Text>
          <Text style={styles.optionStatus}>Padrão</Text>
        </View>
        <TouchableOpacity>
        <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <Image source={require('../assets/icons/color-icon.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.optionText}>Correção de cor</Text>
          <Text style={styles.optionStatus}>Desativado</Text>
        </View>
        <TouchableOpacity>
        <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Sair do App</Text>
      </TouchableOpacity>

      <View style={styles.bottomMenu}>
        <TouchableOpacity>
          {/* Ícone de localização */}
        </TouchableOpacity>
        <TouchableOpacity>
          {/* Ícone de som */}
        </TouchableOpacity>
        <TouchableOpacity>
          {/* Ícone de documentos */}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E8E0',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#631C1C',
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#631C1C',
    textAlign: 'center',
    paddingVertical: 23,
    paddingTop: 1,
    borderBottomWidth: 1,
    borderColor: '#DDC2BB',
    },
  optionText: {
    fontSize: 16,
    color: '#631C1C',
    fontWeight: 'bold',
    borderColor: '#DDC2BB',
  },
  optionStatus: {
    marginHorizontal: 2,
    fontSize: 11,
    color: '#631C1C',
  },
  exitButton: {
    backgroundColor: '#631C1C',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 250,
    marginHorizontal: 60,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginEnd: 10,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderColor: '#DDC2BB',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  editIcon: {
    fontSize: 18,
    color: '#842C2A',
  },
  editableField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
icon: {
    width: 40,
    height: 40,
    marginRight: 3,
  },
    settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#CCC',
  },
    sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000',
    marginVertical: 20,
  },
   textContainer: {
    flex: 10,
  },
    settingTitle: {
    fontSize: 16,
    color: '#800000',
  },
   arrow: {
    fontSize: 40,
    color: '#800000',
  },
});

export default ConfigScreen;