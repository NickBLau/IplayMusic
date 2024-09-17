import React, { useState, useEffect } from "react";
import roundpexel from "../assets/1.png";
import roundpexel2 from "../assets/2.png";
import roundpexel3 from "../assets/3.png";

const Feedgroup = () => {
  const [counter, setCounter] = useState(1239);

  useEffect(() => {
    const timerId = setInterval(() => {
      // Increment the counter using functional update to get the latest value
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 0;

        // Stop the timer when the counter reaches 3,123
        if (newCounter === 3123) {
          clearInterval(timerId);
        }

        return newCounter;
      });
    }, 100); // Adjust the interval as needed

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(timerId);
  }, []); // Run the effect only once on mount

  return (
    <section className="flex items-center text-white">
      <div className="-ml-2">
        <img src={roundpexel} alt="Image 1" className="w-full h-auto" />
      </div>
      <div className="-ml-8">
        <img src={roundpexel2} alt="Image 2" className="w-full h-auto" />
      </div>
      <div className="-ml-8">
        <img src={roundpexel3} alt="Image 3" className="w-full h-auto" />
      </div>
      <div className="">
        <p className="text-lg">
          <span className="font-bold ml-2">{counter} </span>are talking about
          this
        </p>
      </div>
    </section>
  );
};

export default Feedgroup;
