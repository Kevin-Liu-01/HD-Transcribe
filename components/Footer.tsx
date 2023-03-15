import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b pt-10 pb-8 from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 drop-shadow-xl">
      <div className="text-center">
        <div className="text-center ">
          <div className="mb-3">
            <div className="text-gray-800 dark:text-gray-200 max-w-xl mx-8 sm:mx-auto text-sm sm:text-base">
              <p>
                HD Transcribe is an application that aims to provide an
                accessible, convenient way for individuals with
                Huntington&apos;s Disease to communicate.
              </p>
            </div>

            <p className="text-gray-800 dark:text-gray-200 text-xs mt-3 ">
              Research Project <div className="inline text-base mx-1">|</div>{" "}
              Made by Kevin Liu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
