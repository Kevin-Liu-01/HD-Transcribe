import Head from "next/head";
import Main from "../components/Main";
import React from "react";
export default function MainPage(props) {
  return <Main setPage={props.setPage} />;
}
