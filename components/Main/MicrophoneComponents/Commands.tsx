import { isMobile } from "react-device-detect";

function Commands() {
  return (
    <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer from-speechBlue  rounded-[2rem]  flex flex-col overflow-hidden">
      <div className=" bg-[url('../assets/wave2.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>
      <div className="mt-8 text-4xl leading-8 font-extrabold text-white tracking-tight sm:text-5xl text-center select-none  ">
        Commands
      </div>
      <div className="bg-white flex flex-col grow z-10 rounded-2xl m-6 md:m-8 p-3  text-sm drop-shadow-lg">
        <p className="mb-4">
          There are several commands you can use to interact with the model.
          When you say a command, it may take a second for the model to respond.{" "}
          {isMobile &&
            "On mobile devices, it may be difficult to get certain commands."}
        </p>
        <div className="grid grid-cols-2 grow">
          <span className="font-bold text-speechBluer">
            Go to <span className="text-gray-400 italic">*website.com*</span>{" "}
          </span>
          <div className="border pl-2  border-y-0 border-r-0">
            Brings you to a website.
          </div>
          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Wiggle
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Makes the microphone wiggle.
          </div>
          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Plus <span className="text-gray-400 italic">*Number*</span>
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Adds a number to the counter.
          </div>
          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Minus <span className="text-gray-400 italic">*Number*</span>
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Subtracts a number from counter.
          </div>

          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Change Background Color to{" "}
            <span className="text-gray-400 italic">*Color*</span>
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Changes background color.
          </div>
          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Reset Background Color
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Restores gray background.
          </div>

          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Stop
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Stops voice transcription.
          </div>

          <span className="font-bold text-speechBluer border  border-b-0 border-x-0">
            Reset
          </span>
          <div className="border pl-2  border-b-0 border-r-0">
            Removes the transcription.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commands;
