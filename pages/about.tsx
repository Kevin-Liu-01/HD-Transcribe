import Head from "next/head";
import About from "../components/About";
import React from "react";
function AboutPage(props) {
  return <About setPage={props.setPage} />;
}

export default AboutPage;
