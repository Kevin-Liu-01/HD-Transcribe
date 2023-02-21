import Navbar from "./Navbar";
import Microphone from "./Main/Microphone";
import React from "react";
import CountUp from "react-countup";

function Main(props) {
  props.setPage("Home");
  return (
    <div id="background" className="dark:bg-gray-700 bg-gray-300 ">
      <div className="bg-white/60 dark:bg-gray-800/60 bg-blend-lighten min-h-screen transition duration-150 pb-8 bg-[url('https://cdn.discordapp.com/attachments/753798704082714715/1077390395337609296/oie_4iGzXPuQjxVl.png')] bg-cover">
        {/*header section*/}

        <div className="relative items-center">
          {/*Navbar*/}
          <div className="bg-gradient-to-b to-gray-500 pt-8 ">
            <Microphone />
          </div>
        </div>
        {/*header section 2*/}
      </div>
    </div>
  );
}

export default Main;
