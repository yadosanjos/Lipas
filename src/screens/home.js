import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { db, auth } from '../services/firebase/conf';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';

const HomeScreen = () => {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userEmail, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Solicita permissões para acessar a localização
    checkPermissions();
  }, []);

  // Função para verificar as permissões de localização
  async function checkPermissions() {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
      Alert.alert('Permissão necessária', 'O aplicativo precisa de acesso à localização para funcionar.');
      return;
    }

    // Obtém a localização atual do usuário
    getUserLocation();
  }

  // Função para pegar a localização atual do usuário
  async function getUserLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setUserLocation(location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização');
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Usuário", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedUserEmail = docSnap.data().userEmail;
          setEmail(fetchedUserEmail);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (userEmail) {
      const contactsRef = collection(db, 'Contato de Emergência');
      const q = query(contactsRef, where('user', '==', userEmail));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const contactsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsData);
      });

      return () => unsubscribe();
    }
  }, [userEmail]);

  return (
    <View style={styles.container}>
      {region && userLocation ? (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true} // Exibe a localização atual do usuário
          followsUserLocation={true} // Acompanhe a localização do usuário
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Sua Localização"
            pinColor="green"
          />
        </MapView>
      ) : (
        <Text>Carregando mapa...</Text>
      )}

      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Sua Localização</Text>
        {userLocation ? (
          <Text style={styles.locationText}>
            Latitude: {userLocation.latitude.toFixed(6)}, Longitude: {userLocation.longitude.toFixed(6)}
          </Text>
        ) : (
          <Text style={styles.locationText}>Buscando localização...</Text>
        )}

      {contacts.map(contact => (
          <View key={contact.id} style={styles.contactContainer}>
            <View style={styles.alinhamento}>
              <Text style={styles.contactName}>{contact.nomeContato || 'Nome não disponível'}</Text>
            {contact.type === 'lipas' && (
              <Image source={require('../assets/borbo.png')} style={styles.iconButterfly} />
            )}
            </View>
            <View style={styles.alinhamento2}>
              <Text style={styles.contactEmail}>{contact.emailContato}</Text>
            </View>
            <View style={styles.alinhamento3}>
               <Text style={styles.contactCelular}>{contact.celularContato}</Text>
            </View>
            <TouchableOpacity onPress={() => removeContact(contact.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}> Excluir </Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#640F14',
  },
  map: {
    width: '100%',
    height: 400,
  },
  profileContainer: {
    backgroundColor: '#FFEDE3',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -10,
    position: 'absolute',
    bottom: 0,
  },
  profileText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#49070A',
    textAlign: 'center',
  },
  locationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#49070A',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
