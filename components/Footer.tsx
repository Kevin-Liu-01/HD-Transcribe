function Footer() {
  return (
    <footer className="bg-gradient-to-b pt-10 pb-8 from-gray-50 to-gray-100  drop-shadow-xl">
      <div className="text-center text-white ">
        <div className="text-center text-gray-800">
          <div className="mb-3">
            <div className="text-gray-800 max-w-xl mx-8 sm:mx-auto">
              <p>
                HD Transcribe is an application that aims to provide an
                accessible, convenient way for individuals with
                Huntington&apos;s Disease to communicate.
              </p>
            </div>

            <p className="text-gray-800 text-xs mt-3 ">
              Research Project <div className="inline text-base mx-1">|</div>{" "}
              Made by Kevin Liu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
