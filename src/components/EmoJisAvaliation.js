// import React from 'react'
import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native'

const windowHeight = Dimensions.get('window').height;

export const EmoJisAvaliation = ({ handleChangeValueAvaliation, valueAvaliation}) => {

	const colorsSlider = {
		'1': '#E52B17',
		'2': '#FF9900',
		'3': '#F2CC1D',
		'4': '#66CC33',
		'5': '#30BF40',
	}

	return (
	<View style={styles.Container}>
		<View style={styles.ContainerEmojis}>
			<TouchableOpacity style={styles.ButtonEmoji} onPress={() => handleChangeValueAvaliation(1)}>
				<Text style={styles.textEmoji}>MUITO RUIM</Text>
				<Text style={valueAvaliation === 1 ? styles.EmojiIsPressed : styles.Emojis}>😡</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.ButtonEmoji} onPress={() => handleChangeValueAvaliation(2)}>
			<Text style={styles.textEmoji}>RUIM</Text>
				<Text style={valueAvaliation === 2 ? styles.EmojiIsPressed : styles.Emojis}>😒</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.ButtonEmoji} onPress={() => handleChangeValueAvaliation(3)}>
				<Text style={styles.textEmoji}>REGULAR</Text>
				<Text style={valueAvaliation === 3 ? styles.EmojiIsPressed : styles.Emojis}>😐</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.ButtonEmoji} onPress={() => handleChangeValueAvaliation(4)}>
				<Text style={styles.textEmoji}>BOM</Text>
				<Text style={valueAvaliation === 4 ? styles.EmojiIsPressed : styles.Emojis}>😉</Text>		
			</TouchableOpacity>
			<TouchableOpacity style={styles.ButtonEmoji} onPress={() => handleChangeValueAvaliation(5)}>
				<Text style={styles.textEmoji}>MUITO BOM</Text>
				<Text style={valueAvaliation === 5 ? styles.EmojiIsPressed : styles.Emojis}>😃</Text>
			</TouchableOpacity>
		</View>
		<Slider
		thumbTintColor={colorsSlider[valueAvaliation]}
		style={styles.Slider}
		minimumValue={1}
		maximumValue={5}
		step={1}
		value={valueAvaliation}
		minimumTrackTintColor={colorsSlider[valueAvaliation]}
		maximumTrackTintColor="#E52B17"
		onValueChange={handleChangeValueAvaliation}
		/>
	</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
	},
	Slider: {
		marginTop: windowHeight * 0.02,
		width: '81%',
	},
	ContainerEmojis: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	ButtonEmoji: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textEmoji: {
		fontSize: 15,
		color: 'white'
	},
	Emojis: {
		fontSize: 50
	},	
	EmojiIsPressed: {
		fontSize: 60,
		marginBottom: 17,
	}	
})