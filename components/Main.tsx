import Navbar from "./Navbar";
import Microphone from "./Main/Microphone";
import React from "react";
import CountUp from "react-countup";

function Home() {
  return (
    <div id="background" className="bg-gray-300 ">
      <div
        className="min-h-screen  pb-8 bg-[url('https://www.freepnglogos.com/uploads/wave-png/abstract-blue-wave-decoration-png-background-1.png')] bg-cover"
        style={{
          backgroundColor: "rgba(255,255,255,0.6)",
          backgroundBlendMode: "lighten",
        }}
      >
        {/*header section*/}

        <div className="relative items-center">
          {/*Navbar*/}
          <Navbar page="Home" />
          <div className="bg-gradient-to-b to-gray-500 pt-8">
            <Microphone />
          </div>
        </div>
        {/*header section 2*/}
      </div>
    </div>
  );
}

export default Home;
