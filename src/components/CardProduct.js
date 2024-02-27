import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';
import { Fontisto } from '@expo/vector-icons';
import Timer from './Timer'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CardProduct = ({ product }) => {

	const [uri, setUri] = useState(`http://ferramental.ddns.net:5123/files/not-found.png`)

	useEffect(() => {
		setUri(`http://ferramental.ddns.net:5123/files/${product['DIRFOTOPROD'].toLowerCase()}`)
	},[])
	
	return (
		<View style={styles.container}>
				<View style={styles.containerPercentage}>
				<Fontisto 
				name="shopping-sale" 
				size={45} 
				color="#30BF40" 
				style={styles.percentage}>
				</Fontisto>
				<View style={styles.backPercentage}>
				</View>
				<Text style={styles.textPercentage}>{product["DESCONTO"].toFixed()}%</Text>
				</View>
			<Image 
				style={styles.image} 
				source={{uri}}
				resizeMode={product["DIRFOTOPROD"] === 'not-found.png' ? 'cover' : 'contain'}
			/>
			<View style={styles.productDetails}>
				<Text style={{fontWeight: '700'}}>{product["DESCRICAO"]}</Text>
				<Text style={{textDecorationLine: 'line-through', color: '#83858D'}}>{formatCurrency(product["PTABELA"])}</Text>
				<Text style={{color: "#016800", fontSize: 30}}>{formatCurrency(product["VALORCOMDESCONTO"])}</Text>
				<Timer targetDate={product["DTFIMDESCONTO"]}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		width: windowWidth * 0.22,
		height: windowHeight * 0.6,
		margin: 10,
		padding: 10,
		borderRadius: 15,
	},
	image: {
		width: '100%',
		height: '60%',
	},
	productDetails: {
		flex: 1,
		width: '100%',
	},
	containerPercentage: {
		position: 'absolute',
		top: -10,
		right: -12,
		zIndex: 999,
	},
	percentage: {
		zIndex: 999,
		color: "#30BF40"
	},
	backPercentage: {
		backgroundColor: "#30BF40",
		width: 30,
		height: 30,
		borderRadius: 15,
		position: 'absolute',
		top: 12,
		right: 10,
		zIndex: 9999,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textPercentage: {
		color: '#fff',
		fontWeight: '700',
		zIndex: 99999,
		position: 'absolute',
		top: 12,
		right: 5,
		fontSize: 16,
	}
})

export default CardProduct