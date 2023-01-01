import Navbar from "./Navbar";
import Microphone from "./Main/Microphone";
import React from "react";
import CountUp from "react-countup";

function Home() {
  return (
    <div id="background" className="min-h-screen bg-gray-200 pb-8">
      {/*header section*/}

      <div className="  items-center">
        {/*Navbar*/}
        <Navbar page="Home" />
        <div className="bg-gradient-to-b to-gray-500">
          <Microphone />
        </div>
      </div>
      {/*header section 2*/}
    </div>
  );
}

export default Home;
