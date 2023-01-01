function Commands() {
  return (
    <div className="drop-shadow-lg relative  bg-gradient-to-b to-speechBluer from-speechBlue  rounded-3xl flex flex-col  overflow-hidden">
      <div className=" bg-[url('../assets/wave2.jpg')] bg-cover  opacity-20 h-full w-full absolute "></div>
      <div className="mt-8 text-4xl leading-8 font-extrabold text-white tracking-tight sm:text-5xl text-center select-none  ">
        Instructions
      </div>
      <div className="bg-white flex flex-col grow z-10 rounded-2xl m-6 md:m-8 p-3">
        <p className="mb-4">
          Using this voice model is fairly simple. However, to acheive the best
          results, be sure to speak clearly into your microphone. Minimize
          background noise and try to speak at a normal volume.
        </p>
        <ol className="flex flex-col grow">
          <li className="">
            <span className="font-bold">1. </span>Click on the microphone button
            to start recording.
          </li>
          <li className="">
            <span className="font-bold">2. </span>Speak into your microphone
            clearly. You can also say a command you want to execute.
          </li>
          <li className="">
            <span className="font-bold">3. </span>Click on the Stop button to
            stop recording.
          </li>
          <li className="">
            <span className="font-bold">4. </span>Click on the Reset button to
            clear the transcription.
          </li>
          <p className="mt-4">Enjoy using the model!</p>
        </ol>
      </div>
    </div>
  );
}

export default Commands;
