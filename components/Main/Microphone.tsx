import React, { useRef, useState } from "react";
import { MicrophoneIcon, ChatAlt2Icon } from "@heroicons/react/outline";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Analyzer from "./MicrophoneComponents/Analyzer.js";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import { isMobile } from "react-device-detect";
import Speech from "speak-tts";

//Components
import Commands from "./MicrophoneComponents/Commands";
import Instructions from "./MicrophoneComponents/Instructions";

//OpenAI Integration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
});
const openai = new OpenAIApi(configuration);

//Polyfill
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(
  "f2d4d05f-94ee-4a2c-bfd9-ad6304759fcc"
);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

if (!isMobile) {
  // console.log("Disabled Polyfill");
  SpeechRecognition.removePolyfill();
}

export default function HeaderContents() {
  //Transcription and Audio
  const [record, setRecord] = useState(false);
  const [audio, setAudio] = useState(null);

  //Wiggling and Counter
  const [effect, setEffect] = useState(true);
  const [counter, setCounter] = useState(0);

  //OpenAI integration
  const [response, setResponse] = useState("");
  const [activateAI, setActivateAI] = useState(false);

  const handleAI = async () => {
    if (transcript) {
      // Generate a response with OpenAI
      const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: transcript,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
      // console.log(completion.data.choices);
      setResponse(completion.data.choices[0].text);
    }
  };

  //Microphone
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
        if (Number.isInteger(parseInt(number))) {
          setCounter(counter + parseInt(number));
        }
      },
    },
    {
      command: "plus *",
      callback: (number) => {
        if (Number.isInteger(parseInt(number))) {
          setCounter(counter + parseInt(number));
        }
      },
    },
    {
      command: "- *",
      callback: (number) => {
        if (Number.isInteger(parseInt(number))) {
          setCounter(counter - parseInt(number));
        }
      },
    },
    {
      command: "-*",
      callback: (number) => {
        if (Number.isInteger(parseInt(number))) {
          setCounter(counter - parseInt(number));
        }
      },
    },
    {
      command: "divided by *",
      callback: (number) => {
        if (Number.isInteger(parseInt(number))) {
          setCounter(counter / parseInt(number));
        }
      },
    },
    {
      command: "/ *",
      callback: (number) => {
        if (Number.isInteger(parseInt(number))) {
          setCounter(counter / parseInt(number));
        }
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
    {
      command: "activate chat GPT",
      callback: () => {
        setActivateAI(true);
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  const handleListing = () => {
    if (!isListening) {
      startRecording();
      setIsListening(true);
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({
        continuous: true,
      });
    }
  };
  const stopHandle = async () => {
    await stopRecording();
    await setIsListening(false);
    await microphoneRef.current.classList.remove("listening");
    await SpeechRecognition.stopListening();
  };
  const handleReset = async () => {
    if (isListening) {
      await stopHandle();
    }
    resetTranscript();
  };

  const startRecording = () => {
    getMicrophone();
    setRecord(true);
    setResponse("");
    if (activateAI) {
      resetTranscript();
    }
  };

  const stopRecording = () => {
    stopMicrophone();
    setRecord(false);
    if (activateAI) {
      handleAI();
    }
  };

  //Text-to-Speech
  const speech = typeof window !== "undefined" && new Speech();
  typeof window !== "undefined" &&
    speech
      .init({
        lang: "ar-SA",
      })
      .then((data) => {
        // console.log("Speech is ready, voices are available", data);
      })
      .catch((e) => {
        console.error("Error", e);
      });

  const speechHandler = (text) => {
    speech
      .speak({
        text: text,
      })

      .catch((e) => {
        console.error("Error:", e);
      });
  };

  return (
    <div className=" grid grid-cols-1 grid-rows-3 md:grid-rows-2 md:grid-cols-2 max-w-7xl px-3 sm:px-4 md:mx-2 2xl:px-0 lg:mx-auto gap-4 md:gap-[1.85rem]  rounded-3xl">
      <div className="py-4 sm:py-8 drop-shadow-lg relative md:col-span-2 flex flex-col justify-center bg-gradient-to-b to-speechBlue dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark  rounded-[2rem]   overflow-hidden">
        <div className=" bg-[url('../assets/wave1.jpg')] bg-cover dark:opacity-30 opacity-20 h-full w-full absolute "></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 z-10 grow">
          <div>
            <div className="text-[2rem] leading-8 font-extrabold tracking-tight text-white sm:text-5xl text-center select-none  my-4">
              Begin Recording...
            </div>
            <div className="flex flex-col justify-center items-center	my-4 ">
              {counter !== 0 && (
                <div className="text-black bg-gradient-to-r from-gray-100 to-gray-200 rounded-full border p-2 py-0">
                  Counter: {counter}
                </div>
              )}
              {audio ? <Analyzer audio={audio} /> : ""}
              <div ref={microphoneRef} onClick={handleListing} className="">
                <div
                  className={`${
                    effect && "animate-wiggle border-dashed"
                  }  h-48  mt-4 hover:scale-105 transition duration-200 ease-in-out drop-shadow-lg bg-speechBlue dark:bg-speechButton 
                  hover:bg-speechBlueDark dark:hover:bg-speechBlueDarker w-48 rounded-full border-white border-[3px] flex flex-col items-center justify-center
                   text-white`}
                  onClick={() => {
                    setEffect(true);
                  }}
                  onAnimationEnd={() => setEffect(false)}
                >
                  {activateAI ? (
                    <img
                      src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                      className="w-[50%] fill-current svgfill"
                    ></img>
                  ) : (
                    <MicrophoneIcon className="w-[50%]"></MicrophoneIcon>
                  )}
                </div>
              </div>
              <div className="mt-4 text-white select-none">
                {isListening ? (
                  <>
                    <span className="blinking">🔴</span> {"Listening..."}
                  </>
                ) : (
                  "Click to Start Listening"
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 z-10 ml-4 sm:ml-6 lg:ml-0 mr-4 sm:mr-6 lg:mr-8 rounded-2xl lg:rounded-3xl flex flex-col grow">
            <div className="p-4">
              <p className="font-semibold select-none">Transcription:</p>
              {transcript ? (
                <>
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 shadow-inner">
                    <div className="max-h-40 p-2 overflow-y-scroll scrollbar pb-4">
                      {transcript}
                    </div>
                  </div>
                  <button
                    className="bg-gray-200 border border-gray-300 hover:bg-gray-300 duration-150 ease-in-out rounded-xl px-4 p-2 mr-2 mb-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </>
              ) : (
                <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 shadow-inner">
                  <div className="max-h-40 p-2 overflow-y-scroll scrollbar text-gray-400 italic pb-4 select-none">
                    Click the microphone to begin recording!
                  </div>
                </div>
              )}
              {isListening && (
                <button
                  className="bg-red-200 border border-red-300 hover:bg-red-300 duration-150 ease-in-out px-4 rounded-xl p-2 select-none mr-1"
                  onClick={stopHandle}
                >
                  Stop
                </button>
              )}{" "}
              {record ? (
                <button className="bg-green-200 border border-green-300 select-none duration-150 ease-in-out rounded-xl px-4 p-2 mb-2 mr-3 opacity-60">
                  <img
                    src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                    className="h-4 w-4 inline mb-1 sm:mr-1"
                  ></img>
                  <div className="sm:inline hidden text-gray-900">ChatGPT</div>
                </button>
              ) : (
                <button
                  className="bg-green-200 border border-green-300 hover:bg-green-300 duration-150 ease-in-out rounded-xl px-4 p-2 mb-2 mr-3"
                  onClick={() => {
                    setActivateAI(!activateAI);
                  }}
                >
                  <img
                    src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                    className="h-4 w-4 inline mb-1 sm:mr-1"
                  ></img>
                  <div className="sm:inline hidden text-gray-900">ChatGPT</div>
                </button>
              )}
              <button
                className={
                  transcript
                    ? "bg-orange-200 border border-orange-300 hover:bg-orange-300 duration-150 ease-in-out rounded-xl px-4 p-2 mb-2 "
                    : "bg-orange-200 border border-orange-300 duration-150 ease-in-out rounded-xl px-4 p-2 mb-2 opacity-60"
                }
                onClick={() => {
                  speechHandler(transcript);
                }}
              >
                <ChatAlt2Icon className="h-5 sm:h-4 w-5 sm:w-4 inline sm:mb-1 sm:mr-1 text-gray-800" />
                <div className="hidden sm:inline ">Text-to-Speech</div>
              </button>
              {/* <div
                className={
                  activateAI
                    ? "font-semibold select-none text-green-900 italic bg-green-300 rounded-xl border border-green-400 p-2  inline-block  duration-200"
                    : " font-semibold select-none text-green-900 italic bg-green-300 rounded-xl border border-green-400 p-2  inline-block opacity-0 duration-150"
                }
              >
                ChatGPT will respond!
              </div> */}
              <div
                className={
                  activateAI
                    ? "bg-gray-200 rounded-xl mt-2 shadow-inner overflow-hidden h-auto duration-200 ease-in-out "
                    : "bg-gray-200 rounded-xl mt-2 shadow-inner overflow-hidden opacity-0 h-0 sm:h-auto duration-150 ease-in-out "
                }
              >
                <div className=" relative ">
                  <div className="sm:flex max-h-40 overflow-y-scroll scrollbar p-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                      className="h-5 w-5 mb-0.5 sm:mb-0 sm:mt-0.5 mr-2 inline"
                    ></img>
                    <div className="font-semibold select-none inline text-gray-800">
                      ChatGPT:
                    </div>

                    <div className="sm:ml-2 flex sm:mt-0 mt-2">
                      {record ? (
                        <div className="italic text-gray-500   sm:flex">
                          ...
                        </div>
                      ) : (
                        response
                      )}
                    </div>
                    <button
                      className={
                        (response
                          ? "bg-green-300 border border-green-400 hover:bg-green-400 duration-150 ease-in-out rounded-xl px-3 py-1 "
                          : "bg-green-300 border border-green-400 duration-150 ease-in-out rounded-xl px-3 py-1 opacity-60") +
                        " sm:relative sm:h-11 ml-auto absolute top-3 sm:top-auto right-6 sm:right-auto text-green-900 hover:text-green-800 hover:border-green-500"
                      }
                      onClick={() => {
                        speechHandler(response);
                      }}
                    >
                      <ChatAlt2Icon className="h-5 w-5 inline" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Instructions />
      <Commands />
    </div>
  );
}
