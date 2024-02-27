import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import FerramentalLogo from '../../assets/logo-ferramental.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TelaAgradecimento = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {

      navigation.replace('Home');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={FerramentalLogo} style={styles.logo} />
      <Text style={styles.mensagem}>Obrigado pela Avaliação !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e1b5e',
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
    marginBottom: windowHeight * 0.05,
  },
  mensagem: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaAgradecimento;