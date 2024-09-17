export default function durationConverter(milliseconds) {
  // Calculate total seconds
  const totalSeconds = milliseconds / 1000;

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { minutes, seconds };
}
