import Head from "next/head";
import Upload from "../components/File/FileClient";
import React from "react";
import { SpeechProvider } from "@speechly/react-client";

function App(props) {
  return (
    <SpeechProvider
      appId="f2d4d05f-94ee-4a2c-bfd9-ad6304759fcc"
      debug={true}
      logSegments={true}
      vad={{ enabled: false }}
    >
      <Upload setPage={props.setPage} />
    </SpeechProvider>
  );
}

export default App;
