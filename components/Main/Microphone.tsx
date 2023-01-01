import React, { useRef, useState, useEffect } from "react";
import { MicrophoneIcon } from "@heroicons/react/outline";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Analyzer from "./Analyzer.js";

import Commands from "./Commands";
import Instructions from "./Instructions";

function HeaderContents() {
  const [transcription, setTranscription] = useState("");
  const [effect, setEffect] = useState(true);
  const [record, setRecord] = useState(false);
  const [counter, setCounter] = useState(0);
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audio);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (record) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };
  const commands = [
    {
      command: "go to *",
      callback: (website) => {
        window.open("https://" + website.split(" ").join(""));
      },
    },
    {
      command: "+ *",
      callback: (number) => {
        setCounter(counter + parseInt(number));
      },
    },
    {
      command: "- *",
      callback: (number) => {
        setCounter(counter - parseInt(number));
      },
    },
    {
      command: "wiggle",
      callback: () => {
        setEffect(true);
      },
    },
    {
      command: "change background color to *",
      callback: (color) => {
        document.getElementById("background").style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "reset background color",
      callback: () => {
        document.getElementById("background").style.background = ``;
      },
    },
    {
      command: "stop",
      callback: () => {
        stopHandle();
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser does not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    toggleMicrophone();
    startRecording();
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    toggleMicrophone();

    stopRecording();
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  return (
    <div className=" grid grid-cols-1 grid-rows-3 md:grid-rows-2 md:grid-cols-2 max-w-7xl  mx-4 md:mx-8 xl:mx-auto gap-8  rounded-3xl mt-8  overflow-hidden ">
      <div className="py-8 drop-shadow-lg relative md:col-span-2 flex flex-col justify-center bg-gradient-to-b to-speechBlue from-speechBlue  rounded-3xl   overflow-hidden">
        <div className=" bg-[url('../assets/wave1.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 z-10">
          <div>
            {" "}
            <div className="text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl text-center select-none  ">
              Begin Recording...
            </div>
            <div
              ref={microphoneRef}
              onClick={handleListing}
              className="flex flex-col justify-center items-center	 my-8 "
            >
              {audio ? <Analyzer audio={audio} /> : ""}
              <div
                className={`${
                  effect && "animate-wiggle"
                }  h-48  hover:scale-105 transition duration-200 ease-in-out drop-shadow-lg bg-speechBlue hover:bg-speechBlueDark w-48 rounded-full border-white border-2 flex items-center justify-center text-white`}
                onClick={() => {
                  setEffect(true);
                }}
                onAnimationEnd={() => setEffect(false)}
              >
                <MicrophoneIcon className="w-[50%]"></MicrophoneIcon>
              </div>
              <div className="mt-4 text-white">
                {isListening ? (
                  <>
                    <span className="blinking">🔴</span> {"Listening..."}
                  </>
                ) : (
                  "Click to Start Listening"
                )}
              </div>
              <div className="text-white">
                {counter !== 0 && "Counter: " + counter}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 z-10 ml-6 lg:ml-0 mr-6 lg:mr-8 rounded-3xl flex flex-col grow">
            <div className="p-4">
              <p className="font-semibold">Transcription:</p>
              {transcript ? (
                <>
                  <div className="pb-4 ">{transcript}</div>
                  <button
                    className="bg-gray-200 border border-gray-300 hover:bg-gray-300 duration-150 ease-in-out rounded-xl px-4 p-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </>
              ) : (
                <div className="text-gray-400 italic pb-4">
                  Click the microphone to begin recording!
                </div>
              )}{" "}
              {isListening && (
                <button
                  className="bg-red-200 border border-red-300 hover:bg-red-300 duration-150 ease-in-out px-4 rounded-xl p-2"
                  onClick={stopHandle}
                >
                  Stop
                </button>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
      <Instructions />
      <Commands />
    </div>
  );
}

export default HeaderContents;
