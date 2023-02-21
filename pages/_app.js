import Head from "next/head";
import "../styles/App.css";
import "../styles/globals.css";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { SessionProvider } from "next-auth/react";

//All metadata is in THIS component.

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  var darkStore = false;
  useEffect(() => {
    darkStore = Boolean(
      localStorage.getItem("mode") == undefined
        ? false
        : localStorage.getItem("mode")
    );
  }, []);
  const [dark, setDark] = useState(darkStore);
  const [page, setPage] = useState("");

  //Extract dark mode state from local storage
  useEffect(() => {
    if (typeof dark == Boolean) {
      setDark(JSON.parse(localStorage.getItem("mode")));
    }
  }, []);

  //Set dark mode state in local storage
  useEffect(() => {
    if (typeof dark == Boolean) {
      localStorage.setItem("mode", dark);
    }
  }, [dark]);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>HD Transcribe</title>
      </Head>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root " />
      {/*
                This HTML file is a template.
                If you open it directly in the browser, you will see an empty page.

                You can add webfonts, meta tags, or analytics to this file.
                The build step will place the bundled scripts into the <body> tag.

                To begin the development, run `npm start` or `yarn start`.
                To create a production bundle, use `npm run build` or `yarn build`.
            */}
      <div className={dark ? "dark" : ""}>
        <Navbar page={page} dark={dark} setDark={setDark}></Navbar>
        <Component
          {...pageProps}
          dark={dark}
          setDark={setDark}
          setPage={setPage}
        />
        <Footer dark={dark} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
