const TimeConverter = () => {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <>
      {" "}
      <p className="w-6 text-right flex">
        {millisToMinutesAndSeconds(track.duration_ms, "s")} mins
      </p>
    </>
  );
};

export default TimeConverter;
