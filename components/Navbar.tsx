import { Disclosure } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  ChatIcon,
  SunIcon,
  MoonIcon,
  CogIcon,
} from "@heroicons/react/outline";
import React from "react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Upload", href: "/upload" },
  { name: "About", href: "/about" },
];

export default function Navbar(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <nav className="bg-white dark:bg-gray-900 py-4 sm:py-6 drop-shadow-sm dark:text-white">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="max-w-7xl px-4 md:mx-2 2xl:px-0 lg:mx-auto">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex ml-12 sm:ml-0 items-center justify-center sm:items-stretch sm:justify-start">
                  <a className="flex-shrink-0 flex">
                    {/*browser logo begin*/}
                    <Link
                      href="/"
                      className=" hidden sm:flex h-16 w-16 hover:scale-105 transition duration-200 ease-in-out shadow-md shadow-speechBlueDark/50 bg-speechBlue  rounded-full border-white border-2  items-center justify-center text-white"
                    >
                      <ChatIcon className="h-8 w-8"></ChatIcon>
                    </Link>
                    <div className="ml-4 sm:inline my-auto hidden">
                      <p className="my-auto text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                        HD Transcribe
                      </p>
                      <p className="flex pl-2 pr-3 items-center select-none bg-gradient-to-r from-gray-400 dark:from-speechBlue to-gray-500 dark:to-speechBlueDarker rounded-l-full rounded-r-full border  border-gray-300 dark:border-speechBlueLight  font-semibold text-xs py-1 text-white">
                        <CogIcon className="h-4 w-4 inline mr-1 "></CogIcon>
                        Production Build 1.3.1
                      </p>
                    </div>
                    {/*logo end*/}
                    {/*mobile logo begin*/}
                    <Link
                      href="/"
                      className="flex sm:hidden h-14 w-14  drop-shadow-lg bg-speechBlue  rounded-full border-white border-2  items-center justify-center text-white"
                    >
                      <ChatIcon className="h-7 w-7"></ChatIcon>
                    </Link>
                    {/*logo end*/}
                  </a>
                  <div className="hidden sm:block sm:ml-auto my-2">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.name === props.page
                              ? " text-gray-900 border border-t-0 border-l-0 border-r-0 border-b-4 border-speechBlue hover:text-speechBlue dark:text-white"
                              : "text-gray-500 hover:text-speechBlueDark rounded-b-md dark:text-gray-400 dark:hover:text-speechBlue",
                            "px-3 pt-2 pb-1 text-lg font-medium rounded-t-md transition duration-200 ease-in-out"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="md:pl-4 md:mr-2 flex-shrink-0 sm:ml-4 flex justify-self-end items-center select-none ">
                  <button
                    className="flex bg-slate-300 dark:bg-slate-800 rounded-xl px-1 py-1 hover:bg-slate-400 dark:hover:bg-slate-700 dark:text-blue-500 text-white dark:hover:text-blue-400 hover:text-yellow-300 duration-150 ease-in-out "
                    onClick={() => props.setDark(!props.dark)}
                  >
                    <div className="h-9 w-9 flex items-center justify-center">
                      {props.dark ? (
                        <MoonIcon className="h-6 w-6 "></MoonIcon>
                      ) : (
                        <SunIcon className="h-6 w-6 "></SunIcon>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden ">
              <div className="px-2 pt-2 pb-3 space-y-1 ">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.name === props.page
                        ? "hover:bg-gray-300 text-speechBlue"
                        : "text-gray-400 hover:bg-gray-300 hover:text-gray-700",
                      "block px-3 py-2 text-lg hover:scale-105 transition duration-200 ease-in-out"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* <div className="mt-4 max-w-7xl mx-auto border border-t-0 border-l-0 border-r-0 border-b-2 border-gray-300 drop-shadow-md"></div> */}
    </nav>
  );
}
