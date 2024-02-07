import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {Text ,StyleSheet} from "react-native";

const Timer = ({ duration, onComplete }) => {
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return `${hours}:${minutes}:${seconds}`;
    };
    return (
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={['#053f65', '#F7B801', '#0003a3', '#A30000']}
        colorsTime={[7200, 3600, 1800, 0]}
        size={40}
        strokeWidth={2}
        onComplete={onComplete}
        
      >
        {({ remainingTime }) => <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>}
      </CountdownCircleTimer>
    );
   
  };

  const styles = StyleSheet.create({
    timerText: {
        fontSize: 9, // Adjust the font size as needed
      },
  })
  
export default Timer;