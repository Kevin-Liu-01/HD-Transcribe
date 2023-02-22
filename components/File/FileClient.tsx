import React, { useEffect, useState } from "react";
import {
  SpeechSegment,
  stateToString,
  useSpeechContext,
} from "@speechly/react-client";
import { SegmentItem } from "./SegmentItem";
import {
  UploadIcon,
  ChatAlt2Icon,
  CheckIcon,
  XIcon,
} from "@heroicons/react/outline";
import Speech from "speak-tts";

//OpenAI Integration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
});
const openai = new OpenAIApi(configuration);

export default function Upload(props) {
  props.setPage("Upload");

  //File uploading
  const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
  const [tentative, setTentative] = useState("");
  const { client, clientState, segment } = useSpeechContext();
  const [transcript, setTranscript] = useState("");

  //OpenAI integration
  const [response, setResponse] = useState("");
  const [activateAI, setActivateAI] = useState(false);

  //   console.log(tentative);
  //   console.log(speechSegments);

  const handleFileSelect = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const arrayBuffer =
      evt.target.files && (await evt.target.files[0].arrayBuffer());
    await client?.uploadAudioData(arrayBuffer);
  };

  useEffect(() => {
    if (segment) {
      const text = segment.words.map((w) => w.value).join(" ");
      setTentative(text);
      if (segment.isFinal) {
        setTranscript(transcript + tentative);
        if (activateAI && speechSegments[1]) {
          handleAI();
        }
        setTentative("");
        setSpeechSegments((current) => [...current, segment]);
      }
    }
  }, [segment]);

  const handleClearPress = () => {
    setSpeechSegments([]);
    setTentative("");
    setTranscript("");
    setResponse("");
  };

  const handleAI = async () => {
    console.log("AI " + transcript);
    // Generate a response with OpenAI
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: transcript,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    // console.log(completion.data.choices);
    setResponse(completion.data.choices[0].text);
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
    <div className="min-h-screen from-gray-100 dark:from-gray-800 dark:to-gray-900 to-gray-200 bg-gradient-to-b py-8 ">
      <div className=" grid grid-cols-1 md:grid-cols-2 max-w-7xl px-3 sm:px-4 md:mx-2 2xl:px-0 lg:mx-auto gap-4 md:gap-[1.85rem]">
        <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark  rounded-[2rem]  flex flex-col overflow-hidden">
          <div className=" bg-[url('../assets/wave2.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>
          <div className="my-4 text-4xl leading-8 font-extrabold text-white tracking-tight text-center select-none  ">
            Upload
          </div>
          <div className="flex grow items-center justify-center flex-col mx-4 mb-4 bg-gray-300 border-4 border-dashed border-gray-400 rounded-lg sm:rounded-2xl ">
            <div className="my-4">
              <code>
                Client:{" "}
                <span
                  className={clientState ? "text-green-500" : " text-red-500"}
                >
                  {stateToString(clientState)}
                  {clientState ? (
                    <CheckIcon className="h-5  ml-1 inline" />
                  ) : (
                    <XIcon />
                  )}
                </span>
              </code>
            </div>
            <UploadIcon className="h-16 w-16 inline text-speechBlueDarker" />

            <div className="flex flex-col z-10 text-center justify-center items-center mt-2">
              <input
                onChange={handleFileSelect}
                id="file_input"
                type="file"
                accept=".wav"
                className="duration-150 ease-in-out file:duration-150 file:ease-in-out file:bg-blue-50 dark:file:bg-gray-600 file:p-2 file:text-speechBlueDarker dark:file:text-gray-100 file:font-semibold hover:file:cursor-pointer hover:file:bg-amber-50 dark:hover:file:bg-gray-500 file:rounded-none file:border-none block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <p className="block italic text-gray-400">
                Only .wav files are accepted!
              </p>
            </div>
            <div className="relative z-10 mt-2 mb-4">
              <button
                onClick={handleClearPress}
                disabled={!speechSegments.length && !tentative}
                className={
                  !speechSegments.length && !tentative
                    ? "select-none opacity-60 rounded-xl bg-red-200 border-red-300 border px-2 py-1 z-10"
                    : "rounded-xl bg-red-200 border-red-300 border px-2 py-1 z-10 hover:bg-red-300 hover:boredr-red-400 duration-150"
                }
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark  rounded-[2rem]  flex flex-col overflow-hidden">
          <div className=" bg-[url('../assets/wave2.jpg')] bg-cover  opacity-20 dark:opacity-30 h-full w-full absolute "></div>
          <div className="my-4 text-4xl leading-8 font-extrabold text-white tracking-tight text-center select-none  ">
            Commands
          </div>
          <div className="bg-gray-50 z-10 mx-4 mb-4 rounded-2xl lg:rounded-3xl flex flex-col grow">
            <div className="p-4">
              <p className="font-semibold select-none">Transcription:</p>
              {speechSegments[1] ? (
                <>
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 shadow-inner">
                    <div className="max-h-40  overflow-y-scroll scrollbar p-1 sm:px-2 pb-4">
                      <div className="tentative">{tentative}</div>
                      {speechSegments?.map((segment) => (
                        <SegmentItem
                          key={`segment-${segment.contextId}-${segment.id}`}
                          segment={segment}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    className="bg-gray-200 border border-gray-300 hover:bg-gray-300 duration-150 ease-in-out rounded-xl px-4 p-2 mr-2 mb-2"
                    onClick={handleClearPress}
                  >
                    Reset
                  </button>
                </>
              ) : (
                <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 shadow-inner">
                  <div className="max-h-40  overflow-y-scroll scrollbar p-1 sm:px-2 text-gray-400 italic pb-4 select-none">
                    Click the microphone to begin recording!
                  </div>
                </div>
              )}

              {speechSegments[1] ? (
                <button
                  className="bg-green-200 border border-green-300 hover:bg-green-300 duration-150 ease-in-out rounded-xl px-4 p-2 mb-2 mr-3"
                  onClick={() => {
                    setActivateAI(!activateAI);
                  }}
                >
                  <img
                    src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                    className="h-4 w-4 inline mb-1 mr-1"
                  ></img>
                  ChatGPT
                </button>
              ) : (
                <button className="bg-green-200 border border-green-300 select-none duration-150 ease-in-out rounded-xl px-4 p-2 mb-2 mr-3 opacity-60">
                  <img
                    src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                    className="h-4 w-4 inline mb-1 mr-1"
                  ></img>
                  ChatGPT
                </button>
              )}
              <button
                className={
                  speechSegments[1]
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

              <div
                className={
                  activateAI
                    ? "bg-gray-200 rounded-xl mt-2 shadow-inner overflow-hidden duration-200 ease-in-out "
                    : "bg-gray-200 rounded-xl mt-2 shadow-inner overflow-hidden opacity-0 duration-150 ease-in-out "
                }
              >
                <div className=" relative ">
                  <div className="sm:flex max-h-40 overflow-y-scroll scrollbar p-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                      className="h-5 w-5 mb-0.5 sm:mb-0 sm:mt-0.5 mr-2 inline"
                    ></img>
                    <div className="font-semibold select-none inline">
                      ChatGPT:
                    </div>

                    <div className="sm:ml-2 flex sm:mt-0 mt-2">{response}</div>
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
        <div className="sm:col-span-2 drop-shadow-lg relative  bg-gradient-to-b to-speechBluer dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark  rounded-[2rem]  flex flex-col overflow-hidden">
          <div className=" bg-[url('../assets/wave2.jpg')] bg-cover  opacity-20 dark:opacity-30 h-full w-full absolute "></div>
          <div className="my-4 text-4xl leading-8 font-extrabold text-white tracking-tight text-center select-none  ">
            JSON Reader
          </div>
          <div className="bg-gray-100 shadow-inner z-10 mx-4 mb-4 rounded-2xl lg:rounded-3xl flex flex-col grow overflow-hidden">
            <pre className="h-72 max-h-72 overflow-y-scroll scrollbar p-4">
              {speechSegments[1] ? (
                speechSegments?.map((segment) => (
                  <code key={`debug-${segment.contextId}-${segment.id}`}>
                    {JSON.stringify(segment, undefined, 2)}
                  </code>
                ))
              ) : (
                <p className="italic">No transcription yet!</p>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
