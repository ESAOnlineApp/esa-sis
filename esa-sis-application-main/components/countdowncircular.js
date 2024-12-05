import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export default function Timer() {
  return (
    <div>
      <h3>Countdown Circle Timer - Timer</h3>
      <CountdownCircleTimer
        isPlaying
        duration={10}
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
