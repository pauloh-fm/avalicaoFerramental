import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

const Footer = ({ colorText, borderTopColor }) => {

	return (
		<View style={[styles.footer, { borderTopColor: borderTopColor }]}>
			<Text style={[styles.textfooter, {color: colorText}]}><FontAwesome name="whatsapp" size={16} color="green" /> (74) 3613-6111</Text>
			<Text style={[styles.textfooter, {color: colorText}]}><MaterialCommunityIcons name="web" size={14} color="#007aad"/> www.leaoquipamentos.com.br</Text>
			<Text style={[styles.textfooter, {color: colorText}]}><AntDesign name="instagram" size={14} color="purple" /> ferramentalmaquinas</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	footer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignSelf: 'center',
    borderTopWidth: 1,
    height: windowHeight * 0.06,
    width: '95%',
  },
  textfooter: {
    fontSize: 14,
    fontWeight: "600",
  }
})

export default Footer