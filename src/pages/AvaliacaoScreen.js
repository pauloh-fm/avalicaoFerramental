import React, { useState, useEffect } from 'react';
import { 
	SafeAreaView, 
	View, 
	Text, 
	Image, 
	StyleSheet, 
	ScrollView, 
	Dimensions, 
	TouchableOpacity, 
	StatusBar, 
	Platform } 
from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EmoJisAvaliation } from '../components/EmoJisAvaliation'
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isAndroid = Platform.OS === "android"

const AvaliacaoScreen = ({route , navigation}) => {
	console.log('route', route);

  const { params } = route;
  const avaliacaoData = params?.avaliacaoData;
// console.log(avaliacaoData);
const vendedorInfo = {
	nome: params?.avaliacaoData?.nome,
	imagem: params?.avaliacaoData?.imagem,
};

	const [valueAvaliation, setValueAvaliation] = useState(3)

  useEffect(() => {
  }, []);

	const handleChangeValueAvaliation = (value) => {
		setValueAvaliation(value)
//		console.log(value)
	}

	const handleEnviarAvaliacao = async () => {
		try {
			const response = await axios.post('http://192.168.140.126:8002/api/avaliacao/avaliar', {
				avaliacao: valueAvaliation,
				atendenteId: avaliacaoData?._id, 
			});
	
			console.log(response.data);
	
			const successMessagePrefix = "Avaliação recebida com sucesso para o vendedor";
			if (response.data) {
				console.log('Avaliação enviada com sucesso.');
				
				// Navigate to the thank you screen only when the evaluation is successful
				navigation.navigate('TelaAgradecimento');
			} else {
				console.log('Avaliação não enviada com sucesso.');
			}
		} catch (error) {
			console.error('Erro ao enviar avaliação:', error.message);
		}
	};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.leftContainer}>
          <View style={styles.card}>
            <View style={styles.imagemContainer}>
              <Image source={{ uri: vendedorInfo.imagem }} style={styles.vendedorImagem} />
            </View>
          </View>
        </View>

        {/* Parte direita da tela */}
        <ScrollView contentContainerStyle={styles.rightContainer} horizontal={false}>
              <EmoJisAvaliation handleChangeValueAvaliation={handleChangeValueAvaliation} valueAvaliation={valueAvaliation}/>
            <View style={styles.containerButtonSend}>
              <TouchableOpacity style={styles.ButtonSend} onPress={handleEnviarAvaliacao}>
                <LinearGradient
                  colors={['#0097B2', '#7ED957']}
                  style={styles.LinearButton}
                >
                  <Text style={{color: '#fff', fontWeight: '600', fontSize: 18}}>ENVIAR</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textfooter}><FontAwesome name="whatsapp" size={16} color="green" /> (74) 3613-6111</Text>
        <Text style={styles.textfooter}><MaterialCommunityIcons name="web" size={14} color="#007aad"/> www.leaoquipamentos.com.br</Text>
        <Text style={styles.textfooter}><AntDesign name="instagram" size={14} color="purple" /> ferramentalmaquinas</Text>
      </View>
			<StatusBar hidden={true}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0e1b5e',
		paddingTop: isAndroid ? StatusBar.currentHeight : 0,
  },
  subcontainer:{
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
		width: windowWidth * 0.40, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  rightContainer: {
    height: '100%',
		width: windowWidth * 0.60, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  vendedorImagem: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.9,	
    resizeMode: 'cover',
  },
  containerButtonSend: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  ButtonSend: {
    width: '40%',
    height: '30%',
  },
  LinearButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    padding: '10px',
    alignSelf: 'center',
    marginLeft: '52px',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    height: windowHeight * 0.07,
    width: '95%',
  },
  textfooter: {
    color: '#fff',
    fontSize: 14,
    fontWeight: "600",
  }
});

export default AvaliacaoScreen;