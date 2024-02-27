import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  SafeAreaView, 
  Image, 
  StyleSheet, 
  Dimensions, 
  FlatList,
  StatusBar, 
  Platform
} from 'react-native';

import FerramentalLogo from '../../assets/logo-ferramental.png';
import axios from 'axios';
import CardProduct from '../components/CardProduct';
import Footer from '../components/Footer';

const isAndroid = Platform.OS === 'android';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
	const navigation = useNavigation();
  const [productsInPromotion, setProductsInPromotion] = useState([]);
  const [avaliacaoData, setAvaliacaoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prods = await axios.get('http://ferramental.ddns.net:3008/products/promotions');
        setProductsInPromotion(prods.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const checkAvaliacao = async () => {
    try {
      const response = await axios.get('http://192.168.140.126:8002/api/atendente/obter-atendente-avalicao');
      const data = response.data;

      if (data) {
        console.log("Dados: ", data);
        setAvaliacaoData(data);
        navigation.navigate('Avaliacao', { avaliacaoData: data });
      } else {
        console.log('Nenhum atendente para avaliação no momento.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    }
  };
  // Event listener para mensagens WebSocket
	useEffect(() => {
		const socket = new WebSocket('ws://192.168.140.126:8002');
		const handleWebSocketMessage = (event) => {
			try {
				const data = event.data;
	//  console.log("Dados: ", data);
				console.log('Mensagem recebida:', data);
	
				if (data) {
					console.log('Acesso ao Check');
					checkAvaliacao();
				}
			} catch (error) {
				console.error('Erro ao analisar a mensagem', error.message);
			}
		};
	
		const handleWebSocketError = (error) => {
			console.error('Erro de conexão com WebSocket:', error.message);
			// Adicione lógica de tratamento de erro aqui, se necessário
		};
	
		// Adicione um evento de escuta para erros
		socket.addEventListener('error', handleWebSocketError);
	
		// Adicione um evento de escuta para mensagens
		socket.addEventListener('message', handleWebSocketMessage);
	
		return () => {
			// Remova os ouvintes de eventos ao limpar o componente
			socket.removeEventListener('error', handleWebSocketError);
			socket.removeEventListener('message', handleWebSocketMessage);
	
			// Feche a conexão WebSocket
			socket.close();
		};
	}, []);
	


  return (
    productsInPromotion.length > 0 ? (
      <SafeAreaView style={styles.containerPromotions}>
        <Image 
          source={FerramentalLogo} 
          style={{ width: windowWidth * 0.23, height: windowHeight * 0.12 }} 
          resizeMode={'contain'}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={productsInPromotion}
          keyExtractor={(item) => item['CODPROD']+ Math.random()}
          horizontal={true}
          renderItem={({ item: product }) => <CardProduct product={product} />}
        />
        <Footer colorText={'#fff'} borderTopColor={'#fff'} />
        <StatusBar hidden={true} />
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.containerWithoutPromotions}>
        <Image 
          source={FerramentalLogo} 
          style={styles.logo} 
          resizeMode={'contain'}
        />
        <Footer colorText={'#fff'} borderTopColor={'#fff'} />
        <StatusBar hidden={true} />
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  containerWithoutPromotions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e1b5e',
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.8,
  },
  containerPromotions: {
    flex: 1,
    backgroundColor: '#0e1b5e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
    padding: 10,
  },
});

export default HomeScreen;