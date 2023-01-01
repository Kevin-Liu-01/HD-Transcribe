function Commands() {
  return (
    <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer from-speechBlue  rounded-3xl flex flex-col  overflow-hidden">
      <div className=" bg-[url('../assets/wave3.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>
      <div className="mt-8 text-4xl leading-8 font-extrabold text-white tracking-tight sm:text-5xl text-center select-none  ">
        Instructions
      </div>
      <div className="bg-white flex flex-col grow z-10 rounded-2xl m-6 md:m-8 p-3  text-sm drop-shadow-lg">
        <p className="mb-4">
          Using this voice model is fairly simple. However, to acheive the best
          results, be sure to speak clearly into your microphone. Minimize
          background noise and try to speak at a normal volume.
        </p>
        <div className="flex flex-col grow">
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
          <p className="mt-4">Enjoy using the model!</p>
        </div>
      </div>
    </div>
  );
}

export default Commands;
