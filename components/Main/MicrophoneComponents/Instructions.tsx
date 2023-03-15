import Link from "next/link";

function Instructions() {
  return (
    <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer dark:to-speechBlueDarker from-speechBlue dark:from-speechBlueDark rounded-[2rem]  flex flex-col  overflow-hidden">
      <div className=" bg-[url('../assets/wave3.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>
      <div className="mt-4 sm:mt-6 leading-8 font-extrabold text-white tracking-tight text-[2rem] sm:text-[2.75rem] text-center select-none  ">
        Instructions
      </div>
      <div className="text-xs sm:text-sm bg-white flex flex-col grow z-10 rounded-2xl m-4 sm:m-6 md:m-8 md:mt-6 p-3 drop-shadow-lg">
        <p className="mb-4">
          Using this voice model is fairly simple. However, to acheive the best
          results, be sure to speak clearly into your microphone. Minimize
          background noise and try to speak at a normal volume.
        </p>
        <div className="grid grid-cols-1 grow">
          <div className="">
            <span className="font-bold">1. </span>Click on the{" "}
            <span className="text-speechBluer font-bold">Microphone</span>{" "}
            button to start recording.
          </div>
          <div className="mt-1">
            <span className="font-bold">2. </span>Speak into your microphone
            clearly. You can also say a command you want to execute. Try to
            reduce background noise when speaking to avoid interference.
          </div>
          <div className="mt-1">
            <span className="font-bold ">3. </span>Click on the{" "}
            <span className="text-speechBluer font-bold">Stop</span> button to
            stop recording.
          </div>
          <div className="mt-1">
            <span className="font-bold">4. </span>Click on the{" "}
            <span className="text-speechBluer font-bold">Reset</span> button to
            clear the transcription.
          </div>
          <div className="mt-1">
            <span className="font-bold">5. </span>Finally, if you would like,{" "}
            <Link href="/upload" className="text-speechBluer font-bold">
              upload a file
            </Link>{" "}
            to generate a transcription for the file.
          </div>
          <p className="mt-2">
            Enjoy using the model!{" "}
            <strong className="text-speechBluer">
              Be sure to check out the new OpenAI ChatGPT integration and
              text-to-speech features!
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
