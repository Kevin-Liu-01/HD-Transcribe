import Head from "next/head";
import Main from "../components/Main";
import React from "react";
function App(props) {
  return <Main setPage={props.setPage} />;
}

export default App;
