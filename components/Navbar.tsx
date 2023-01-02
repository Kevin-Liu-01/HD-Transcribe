import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, ChatIcon, CogIcon } from "@heroicons/react/outline";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

function Navbar(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="bg-white py-8 drop-shadow-sm">
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
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <a className="flex-shrink-0 flex">
                    {/*browser logo begin*/}
                    <Link
                      href="/"
                      className=" hidden sm:flex h-16 w-16 hover:scale-105 transition duration-200 ease-in-out drop-shadow-lg bg-speechBlue  rounded-full border-white border-2  items-center justify-center text-white"
                    >
                      <ChatIcon className="h-8 w-8"></ChatIcon>
                    </Link>
                    <div className="ml-4 sm:inline hidden">
                      <p className="my-auto text-2xl font-extrabold">
                        HD Transcribe
                      </p>
                      <p className="mt-1 pl-2 select-none bg-gradient-to-r from-gray-400 to-gray-500 rounded-l-full rounded-r-full border border-gray-300 font-semibold text-xs py-1 text-white">
                        <span className="w-auto bg-white rounded-full mr-2">
                          <CogIcon className="h-4 w-4 inline"></CogIcon>
                        </span>
                        Pre-Alpha Build 1.2.1
                      </p>
                    </div>
                    {/*logo end*/}
                    {/*mobile logo begin*/}
                    <Link
                      href="/"
                      className="flex sm:hidden h-20 w-20  drop-shadow-lg bg-speechBlue  rounded-full border-white border-2  items-center justify-center text-white"
                    >
                      <ChatIcon className="h-12 w-12"></ChatIcon>
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
                              ? " text-gray-900 border border-t-0 border-l-0 border-r-0 border-b-4 border-speechBlue hover:text-speechBlue"
                              : "text-gray-500 hover:text-speechBlueDark rounded-b-md",
                            "px-3 pt-2 pb-1 text-lg font-medium rounded-t-md transition duration-200 ease-in-out"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
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
    </div>
  );
}

export default Navbar;
