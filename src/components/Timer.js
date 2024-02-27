import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; 

const Timer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Limpando o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = targetTime - currentTime;

    if (timeDiff <= 0) {
      // A data alvo já passou
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  }

  return (
    <View style={styles.container}>
			<SimpleLineIcons name="clock" size={17} color="red" />
      <Text
			style={{
				color: 'red',
				marginLeft: 5,
				fontWeight: '500',
			}}
			>
			{timeRemaining.days < 10 ? '0' + timeRemaining.days +'D ' : timeRemaining.days + 'D ' }
				{timeRemaining.hours < 10 ? '0' + timeRemaining.hours : timeRemaining.hours}: 
				{timeRemaining.minutes < 10 ? '0' + timeRemaining.minutes : timeRemaining.minutes}: 
				{timeRemaining.seconds < 10 ? '0' + timeRemaining.seconds : timeRemaining.seconds}
			</Text>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	}
})

export default Timer;
