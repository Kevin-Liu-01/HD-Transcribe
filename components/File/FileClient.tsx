import React, { useEffect, useState } from "react";
import {
  SpeechSegment,
  stateToString,
  useSpeechContext,
} from "@speechly/react-client";
import {
  UploadIcon,
  ChatAlt2Icon,
  CheckIcon,
  XIcon,
} from "@heroicons/react/outline";
import Speech from "speak-tts";
import { useSession } from "next-auth/react";

//OpenAI Integration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
});
const openai = new OpenAIApi(configuration);

export default function Upload(props) {
  props.setPage("Upload");
  const { data: session } = useSession();

  //File uploading
  const [speechSegments, setSpeechSegments] = useState<SpeechSegment[]>([]);
  const [tentative, setTentative] = useState("");
  const { client, clientState, segment } = useSpeechContext();
  const [transcript, setTranscript] = useState("");
  const [orientation, setOrientation] = useState(true);

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
      console.log(segment);
      const text = segment.words.map((w) => w.value).join(" ");
      setTentative(text);
      if (segment.isFinal) {
        const text = segment.words.map((w) => w.value).join(" ");
        setTranscript(text);
        if (activateAI && text.length > 0) {
          handleAI(text);
        }
        setTentative("");
        setSpeechSegments((current) => [...current, segment]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const handleClearPress = () => {
    setSpeechSegments([]);
    setTentative("");
    setTranscript("");
    setResponse("");
    (document.getElementById("file_input") as HTMLInputElement).value = null;
  };

  const handleAI = async (text) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    // console.log(completion.data.choices);
    setResponse(completion.data.choices[0].message.content);
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
    <div id="background" className="dark:bg-gray-700 bg-gray-300 ">
      <div className="bg-white/70 dark:bg-gray-800/80 bg-blend-lighten dark:bg-blend-darken min-h-screen transition duration-150 pb-8 bg-[url('https://cdn.discordapp.com/attachments/753798704082714715/1077390395337609296/oie_4iGzXPuQjxVl.png')] bg-cover">
        <div className="relative items-center">
          <div className="bg-gradient-to-b to-gray-500 pt-5 sm:pt-8 ">
            <div className=" grid grid-cols-1 md:grid-cols-2 max-w-7xl px-3 sm:px-4 md:mx-2 2xl:px-0 lg:mx-auto gap-4 md:gap-[1.85rem]">
              <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark rounded-[2rem] flex flex-col overflow-hidden">
                <div className=" bg-[url('../assets/wave2.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>
                <div className="my-6 text-[2rem] sm:text-[2.75rem] leading-8 font-extrabold text-white tracking-tight text-center select-none  ">
                  Upload File
                </div>
                <div className="flex grow items-center justify-center flex-col mx-4 md:mx-6 mb-4 md:mb-6 bg-gray-200 border-[3px] border-dashed border-gray-400 rounded-2xl  shadow-inner">
                  <div className="mt-4 mb-6 sm:mb-3">
                    <code>
                      Client:{" "}
                      <span
                        className={
                          clientState ? "text-green-500" : " text-red-500"
                        }
                      >
                        {stateToString(clientState)}
                        {clientState ? (
                          <CheckIcon className="h-5 mb-1 ml-1 inline" />
                        ) : (
                          <XIcon className="h-5 mb-1 ml-1 inline" />
                        )}
                      </span>
                    </code>
                  </div>
                  {activateAI ? (
                    <img
                      src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                      className="h-16 lg:h-24 w-16 lg:w-24 inline opacity-80 svgfill-blue mb-8 sm:mb-4"
                    ></img>
                  ) : (
                    <UploadIcon className="h-16 lg:h-24 w-16 lg:w-24 inline text-speechBlueDark mb-8 sm:mb-4" />
                  )}

                  <div className="flex flex-col z-10 text-center justify-center items-center mx-4 mb-8 sm:mb-0">
                    <input
                      onChange={handleFileSelect}
                      id="file_input"
                      type="file"
                      accept=".wav"
                      className="duration-150 ease-in-out file:duration-150 file:ease-in-out file:bg-blue-50 dark:file:bg-speechBlueDarker file:p-2
                       file:text-speechBlueDarker dark:file:text-gray-100 file:font-semibold hover:file:cursor-pointer hover:file:bg-blue-100
                        dark:hover:file:bg-speechBlue file:rounded-none file:border-none block w-full text-sm text-gray-900 border
                         border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-speechBlueDarker focus:outline-none dark:bg-speechBlueLight
                          dark:border-speechBlueDark dark:placeholder-gray-400"
                    />
                    <p className="block italic text-gray-400 text-sm">
                      Only .wav files are accepted!
                    </p>
                  </div>
                  <div className="relative z-10 mt-2 mb-6 sm:mb-4">
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
                <div className=" bg-[url('../assets/wave3.jpg')] bg-cover  opacity-20 dark:opacity-30 h-full w-full absolute "></div>
                <div className="my-6 text-[2rem] sm:text-[2.75rem] leading-8 font-extrabold text-white tracking-tight text-center select-none  ">
                  Transcription
                </div>
                <div className="bg-gray-50 z-10 mx-4 md:mx-6 mb-4 md:mb-6 rounded-3xl flex flex-col grow">
                  <div className="p-4">
                    <p className="font-semibold select-none">Transcription:</p>
                    <div className="mb-4 rounded-lg overflow-hidden bg-gray-200 shadow-inner">
                      <div className="max-h-40 p-4 overflow-y-scroll scrollbar pb-4">
                        {transcript ? (
                          <>
                            <div className="inline">
                              <img
                                src={
                                  session
                                    ? session.user.image
                                    : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                                }
                                className="h-5 w-5 mr-2 inline rounded-full sm:mb-1"
                              ></img>
                              <div className="font-semibold select-none inline text-gray-800">
                                {session ? session.user.name : "Guest"}:
                              </div>
                            </div>
                            {" " + transcript}
                          </>
                        ) : (
                          <div className="select-none">
                            <div className="inline">
                              <img
                                src={
                                  session
                                    ? session.user.image
                                    : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                                }
                                className="h-5 w-5 mr-2 inline rounded-full sm:mb-1 "
                                alt="avatar"
                              ></img>
                              <div className="font-semibold select-none inline text-gray-500">
                                {session ? session.user.name : "Guest"}:
                              </div>
                            </div>
                            <span className="italic text-gray-400">
                              {" "}
                              Upload a file to begin transcription!
                            </span>
                          </div>
                        )}
                        <div
                          className={
                            !orientation && activateAI ? "inline" : "hidden"
                          }
                        >
                          <div className=" relative mt-6">
                            <div className="sm:flex ">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                                className="h-5 w-5 mb-0.5 sm:mb-0 sm:mt-0.5 mr-2 inline"
                                alt="ChatGPT"
                              ></img>
                              <div className="font-semibold select-none inline text-gray-800">
                                ChatGPT:
                              </div>

                              <div className="sm:ml-2 flex sm:mt-0 mt-2">
                                {response}
                              </div>
                              <button
                                className={
                                  (response
                                    ? "bg-green-300 border border-green-400 hover:bg-green-400 duration-150 ease-in-out rounded-xl px-3 py-1 "
                                    : "bg-green-300 border border-green-400 duration-150 ease-in-out rounded-xl px-3 py-1 opacity-60") +
                                  " sm:relative sm:h-11 ml-auto absolute bottom-0 right-3 sm:right-auto text-green-900 hover:text-green-800 hover:border-green-500"
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

                    {transcript ? (
                      <button className="bg-green-200 border border-green-300 select-none duration-150 ease-in-out rounded-xl px-3 sm:px-4 p-2 mb-2 mr-3 opacity-60">
                        <img
                          src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                          className="h-4 w-4 inline mb-1 mr-1 "
                        ></img>
                        <div className="sm:inline hidden text-gray-900">
                          ChatGPT
                        </div>
                      </button>
                    ) : (
                      <button
                        className="bg-green-200 border border-green-300 hover:bg-green-300 duration-150 ease-in-out rounded-xl px-3 sm:px-4 p-2 mb-2 mr-3"
                        onClick={() => {
                          setActivateAI(!activateAI);
                        }}
                      >
                        <img
                          src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                          className="h-4 w-4 inline mb-1 sm:mr-1 "
                        ></img>
                        <div className="sm:inline hidden text-gray-900">
                          ChatGPT
                        </div>
                      </button>
                    )}
                    {activateAI ? (
                      <button
                        className="bg-blue-200 border border-blue-300 hover:bg-blue-300 duration-150 ease-in-out px-3 sm:px-4 rounded-xl p-2 select-none mr-3"
                        onClick={() => setOrientation(!orientation)}
                      >
                        <svg
                          className="h-4 w-4 inline mb-1 sm:mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>

                        <div className="sm:inline hidden text-gray-900">
                          Switch
                        </div>
                      </button>
                    ) : (
                      <></>
                    )}
                    <button
                      className={
                        transcript
                          ? "bg-orange-200 border border-orange-300 hover:bg-orange-300 duration-150 ease-in-out rounded-xl px-3 sm:px-4 p-2 mb-2 "
                          : "bg-orange-200 border border-orange-300 duration-150 ease-in-out rounded-xl px-3 sm:px-4 p-2 mb-2 opacity-60 select-none"
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
                        orientation && activateAI
                          ? "bg-gray-200 rounded-xl mt-2 shadow-inner overflow-hidden duration-200 ease-in-out "
                          : "bg-gray-200 rounded-xl mt-2 shadow-inner overflow-hidden opacity-0 h-0 duration-150 ease-in-out "
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
                            {response}
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
              <div className="sm:col-span-2 drop-shadow-lg relative  bg-gradient-to-b to-speechBluer dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark  rounded-[2rem]  flex flex-col overflow-hidden">
                <div className=" bg-[url('../assets/wave1.jpg')] bg-cover  opacity-20 dark:opacity-30 h-full w-full absolute "></div>
                <div className="my-6 text-[2rem] sm:text-[2.75rem] leading-8 font-extrabold text-white tracking-tight text-center select-none  ">
                  JSON Output
                </div>
                <div className="flex grow flex-col mx-4 md:mx-6 mb-4 md:mb-6 bg-gray-200 border-[3px] border-dashed border-gray-400 rounded-2xl overflow-hidden shadow-inner">
                  <pre className="h-72 max-h-72 overflow-y-scroll scrollbar p-4 w-full z-10">
                    {transcript ? (
                      speechSegments?.map((segment) => (
                        <code key={`debug-${segment.contextId}-${segment.id}`}>
                          {JSON.stringify(segment, undefined, 2)}
                        </code>
                      ))
                    ) : (
                      <p className="italic text-gray-400">
                        Upload a file to see the details of the transcription!
                      </p>
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
