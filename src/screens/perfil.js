import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Input }  from 'react-native-elements';

const PerfilScreen = ({ navigation }) => {
    const [text, setName] = useState(null);
    const [tel, setTel] = useState(null);
    const [email, setEmail] = useState(null);

    const continuar = () => {
        navigation.navigate('')
      };
  return (
    <ScrollView>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sua Conta</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Avatar
          size="large"
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={styles.avatar}
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar foto</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.infoText}>#0001</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} placeholder="Julia Cabral" />
          <Image source={require('../assets/icons/edit-icon.png')} style={styles.icon} />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Endereço de e-mail</Text>
          <TextInput style={styles.input} placeholder="julia.cabral@gmail.com" />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} placeholder="(11) 99090-9090" />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="********" />
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9E0',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 15,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#49070A',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    backgroundColor: '#49070A',
    width: 80,
    height: 80,
  },
  editButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#49070A',
    borderRadius:10,
  },
  editButtonText: {
    color: '#F8E9E0',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoSection: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 23,
    color: '#631C1C',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#631C1C',
    paddingVertical: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingTop: 1,
    borderColor: '#DDC2BB',
    fontWeight: 'light',
  },
  input: {
    fontSize: 20,
    fontWeight: 'light',
    color: '#631C1C',
    paddingVertical: 1,
    paddingTop: 1,
    borderColor: '#DDC2BB',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingTop: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 3,
    marginHorizontal: 230,
    marginVertical: 2,
  },
});

export default PerfilScreen;
