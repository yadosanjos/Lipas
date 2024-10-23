  import React, { useState, useEffect} from 'react';
  import * as ImagePicker from 'expo-image-picker';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, Modal, Button } from 'react-native';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5' 
  
  export default function ProfileScreen() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('Julia Cabral');
    const [email, setEmail] = useState('julia.cabral@gmail.com');
    const [phone, setPhone] = useState('(11) 98765-4321');
    const [password, setPassword] = useState('********');
    const [modalVisible, setModalVisible] = useState(false); // Modal para opções de foto
    const [confirmModalVisible, setConfirmModalVisible] = useState(false); // Modal de confirmação de salvamento

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
  
    // Estados temporários para armazenar o valor enquanto edita
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newPhone, setNewPhone] = useState(phone);
    const [newPassword, setNewPassword] = useState('');
  
    // Funções para alternar entre visualização e edição
    const toggleEditName = () => setIsEditingName(!isEditingName);
    const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);
    const toggleEditPhone = () => setIsEditingPhone(!isEditingPhone);
    const toggleEditPassword = () => setIsEditingPassword(!isEditingPassword);
  
    const handleSave = () => {
      if (validateEmail(newEmail) && validatePhone(newPhone)) {
        setName(newName);
        setEmail(newEmail);
        setPhone(newPhone);
        if (newPassword) {
          setPassword('********'); // Reseta a senha para esconder após salvar
        }
        // Exibe o modal de confirmação de salvamento
        setConfirmModalVisible(true);
        // Reseta o modo de edição
        setIsEditingName(false);
        setIsEditingEmail(false);
        setIsEditingPhone(false);
        setIsEditingPassword(false);
      } else {
        alert('Erro', 'Por favor, insira informações válidas.');
      }
    };
  
    // Validação simples de e-mail
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
  
    // Validação simples de telefone (apenas números)
    const validatePhone = (phone) => {
      const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
      return regex.test(phone);
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    return (
      <View style={styles.container}>
       <Text style={styles.header}>Sua Conta</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Botão para abrir o modal */}
      <TouchableOpacity onPress={pickImage} style={styles.editPhotoButton}>
        <Text style={styles.editPhotoText}>Editar Foto</Text>
      </TouchableOpacity>

  
  <ScrollView>
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Nome:</Text>
            </View>
            {isEditingName ? (
               <TextInput
               style={styles.inputField}
               value={newName}
               onChangeText={setNewName}
             />
            
           ) : (
            <Text style={styles.value}>{name}</Text>
          )}
          <TouchableOpacity onPress={toggleEditName} style={styles.iconButton}>
            <FontAwesome5 name={isEditingName ? "save" : "edit"} size={25} color="#641919" />
          </TouchableOpacity>
        </View>
  
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>E-mail:</Text>
          </View>
        {isEditingEmail ? (
          <TextInput
            style={styles.inputField}
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.value}>{email}</Text>
        )}
        <TouchableOpacity onPress={toggleEditEmail} style={styles.iconButton}>
          <FontAwesome5 name={isEditingEmail ? "save" : "edit"} size={25} color="#641919" />
        </TouchableOpacity>
      </View>
  
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Telefone:</Text>
          </View>
            {isEditingPhone ? (
            <TextInput
              style={styles.inputField}
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{phone}</Text>
          )}
          <TouchableOpacity onPress={toggleEditPhone} style={styles.iconButton}>
            <FontAwesome5 name={isEditingPhone ? "save" : "edit"} size={25} color="#641919" />
          </TouchableOpacity>
        </View>
  
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Senha:</Text>
          </View>
            {isEditingPassword ? (
            <TextInput
              style={styles.inputField}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
              placeholder="Digite a nova senha"
            />
          ) : (
          <Text style={styles.value}>{password}</Text>
        )} 
          <TouchableOpacity onPress={toggleEditPassword} style={styles.iconButton}>
            <FontAwesome5 name={isEditingPassword ? "save" : "edit"} size={25} color="#641919" />
          </TouchableOpacity>
        </View>
  
       {/* Modal de confirmação */}
    <Modal
    animationType="slide"
    transparent={true}
    visible={confirmModalVisible}
    onRequestClose={() => setConfirmModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <Image source={require('../assets/borbo.png')} style={styles.borb} />
        <Text style={styles.modalText}>Informações salvas com sucesso!</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setConfirmModalVisible(false)}
        >
          
          <Text style={styles.closeText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
    <Text style={styles.saveButtonText}>Salvar</Text>
  </TouchableOpacity>
  </ScrollView>
  </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAE9E4',
      padding: 20,
    },
    header: {
      fontSize: 25,
      fontFamily: 'Inter_600SemiBold',
      color: '#641919',
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    editPhotoButton: {
      backgroundColor: '#49070A',
      borderWidth: 2,
      padding: 17,
      marginHorizontal: 110,
      marginVertical: 10,
      alignItems: 'center',
      paddingVertical: 6,
      borderRadius: 12,
    },
    editPhotoText: {
      color: '#FFEDE3',
      fontFamily: 'Inter_600SemiBold',
      fontSize: 20,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderColor: '#DDC2BB',
    },
    infoTextContainer: {
      flex: 1,
    },
    label: {
      fontSize: 23,
      color: '#49070A',
      fontFamily: 'Inter_600SemiBold',
    },
    value: {
      fontSize: 18,
      color: '#641919',
      fontFamily: 'Inter_400Regular',
    },
    fieldContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    textField: {
      fontSize: 1,
      color: '#555',
      flex: 2,
    },
    inputField: {
      borderBottomWidth: 1,
      borderBottomColor: '#333',
      fontSize: 16,
      padding: 5,
      color: '#333',
      flex: 2,
    },
    iconButton: {
      marginLeft: 10,
    },
    saveButton: {
      backgroundColor: '#49070A',
      paddingVertical: 10,
      borderRadius: 18,
      alignItems: 'center',
      marginTop: 65,
      marginHorizontal: 85,
    },
    saveButtonText: {
      color: '#FAE9E4',
      fontSize: 25,
      fontFamily: 'Inter_700Bold',
      marginEnd: 10,
    },
    photo: {
      width: 90,
      height: 90,
      borderRadius: 10,
    },
    textphoto:{
      textAlign: 'center',
      color: '#FFE4E1',
      fontFamily: 'Inter_600SemiBold',
    },
    image: {
      width: 165,
      height: 165,
      marginHorizontal: 109,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#49070A',
      marginVertical: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    modalContent: {
      backgroundColor: '#FFE4E1',
      padding: 12,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalButton: {
      backgroundColor: '#49070A',
      borderWidth: 1,
      padding: 111,
      marginVertical: 1,
      alignItems: 'center',
      paddingVertical: 17,
      borderRadius: 30,
    },
    modalButton2:{
      borderWidth: 1,
      padding: 120,
      marginVertical: 17,
      alignItems: 'center',
      paddingVertical: 17,
      borderRadius: 30,
      borderColor: '#49070A',
    },
    modalButton3:{
    borderWidth: 1,
    padding: 130,
    marginVertical: 1,
    alignItems: 'center',
    paddingVertical:17,
    borderRadius: 30,
    borderColor: '#49070A',
},
    modalButtonText: {
      color: '#49070A',
      fontSize: 18,
      fontFamily: 'Inter_600SemiBold',
    },
    modalButtonText1:{
    color: '#FFEDE3',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',   
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 412,
      padding: 30,
      backgroundColor: '#F5E4E1',
      borderRadius: 1,
      alignItems: 'center',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    modalText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Inter_700Bold',
      color: '#640F14',
    },
    closeText:{
      color: '#FFEDE3',
      fontFamily: 'Inter_600SemiBold',
      fontSize: 20,
      textAlign: 'center',
    },
    closeButton:{
      backgroundColor: '#49070A',
      borderWidth: 2,
      padding: 17,
      marginHorizontal: 110,
      marginVertical: 1,
      alignItems: 'center',
      paddingVertical: 6,
      borderRadius: 12,
    },
    borb: {
      width: 100,
      height: 125,
      marginVertical: 1,
      marginRight: 25,
      alignItems: 'center',
    },
});