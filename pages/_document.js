import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <meta charset="utf-8" />

        <meta
          name="description"
          content="HD Transcribe is an application that aims to provide a way for individuals with Huntington's Disease to communicate. HD-Transcribe allows for the live and recorded transcription of speech into text. "
        />
        <meta content="./favicon.png" property="og:image" />
        <link rel="apple-touch-icon" href="./favicon.png" />
        {/*
                    manifest.json provides metadata used when your web app is installed on a
                    user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
                */}
        <link rel="manifest" href="./manifest.json" />
        {/*
                    Notice the use of %PUBLIC_URL% in the tags above.
                    It will be replaced with the URL of the `public` folder during the build.
                    Only files inside the `public` folder can be referenced from the HTML.
                    Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
                    work correctly both with client-side routing and a non-root public URL.
                    Learn how to configure a non-root public URL by running `npm run build`.
                */}

        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@701,200,500,301,201,300,601,600,401,501,400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-hanken">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
