import { DesktopComputerIcon, ChatAlt2Icon } from "@heroicons/react/outline";
import Navbar from "./Navbar";
import React from "react";

export default function About(props) {
  props.setPage("About");
  return (
    <div id="background" className="dark:bg-gray-700 bg-gray-300 ">
      <div className="bg-white/60 dark:bg-gray-800/60 bg-blend-lighten dark:bg-blend-darken min-h-screen transition duration-150 pb-8 bg-[url('https://cdn.discordapp.com/attachments/753798704082714715/1077390395337609296/oie_4iGzXPuQjxVl.png')] bg-cover">
        <div className="relative items-center">
          <div className="bg-gradient-to-b to-gray-500 pt-8 ">
            <div className=" max-w-7xl px-4 md:mx-2 2xl:px-0 lg:mx-auto pt-8">
              <h2 className="text-lg font-semibold text-speechBlueDark">
                About HD Transcribe
              </h2>
              <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                My Mission
              </p>
              <p className="mt-4 max-w-5xl text-xl text-gray-500 dark:text-gray-400 ">
                To allow Huntington&apos;s Disease patients to communicate more
                easily and improve their quality of life, this project aims to
                produce a deep-learning voice recognition algorithm that can
                understand HD patients&apos; speech. This algorithm will
                specifically be trained with audio clips of HD patients and
                transcripts of their words. Therefore, it will be able to
                interpret HD patients&apos; specific patterns of speech and
                produce transcripts of their words, facilitating communication
                between these patients and their loved ones.
              </p>
              <div className="border border-x-0 border-t-0 border-b-2 border-gray-300 dark:border-gray-700 mt-10"></div>
              <div className="mt-12 rounded-xl">
                <dl className="mx-4 space-y-10 md:grid md:grid-rows-3 md:gap-x-4 md:gap-y-10 md:space-y-0">
                  <div className="relative text-gray-900 dark:text-white">
                    <dt>
                      <div className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-speechBlue to-speechBlueDark text-white">
                        <ChatAlt2Icon className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-xl font-medium leading-6">
                        Comfort & Communication
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base dark:text-gray-400">
                      HD Transcribe provides a speech-to-text function that
                      allows patients to communicate with others more easily. As
                      the disease progresses, individuals may have difficulty
                      speaking clearly or may have difficulty controlling the
                      movements of their mouth and throat, making it difficult
                      for others to understand them. By using this tool to
                      convert their speech into written text, they can
                      communicate more effectively and with less frustration.
                    </dd>
                  </div>

                  <div className="relative text-gray-900 dark:text-white">
                    <dt>
                      <div className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-speechBlue to-speechBlueDark text-white">
                        <DesktopComputerIcon className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-xl font-medium leading-60">
                        Tracking & Monitoring
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base dark:text-gray-400">
                      Another potential use for HD Transcribe in individuals
                      with Huntington&apos;s disease is as a tool for monitoring
                      the progression of the disease. As the disease progresses,
                      individuals may experience changes in their speech
                      patterns, such as slurred speech or changes in their vocal
                      pitch. By using HD Transcribe to transcribe speech samples
                      over time, doctors and caregivers can track these changes
                      and use them to monitor the progression of the disease.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
