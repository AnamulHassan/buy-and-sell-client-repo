import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-r
    from-[#af8071] to-[#c5a07e] text-[#e8eceb] mt-12 w-screen"
    >
      <div className="px-4 pt-16 mx-auto w-11/12 lg:w-10/12 2xl:w-9/12 md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-medium tracking-wide text-white">Category</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    World
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    References
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-white">Apples</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Web
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    eCommerce
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Entertainment
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-white">Cherry</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Media
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Nonprofit
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Educational
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium tracking-wide text-white">Business</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Infopreneur
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Personal
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Wiki
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[#e8eceb] transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:max-w-md lg:col-span-2">
            <span className="text-base font-medium tracking-wide text-white">
              Subscribe for updates
            </span>
            <form className="flex flex-col mt-4 md:flex-row">
              <input
                placeholder="Email"
                required
                type="email"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border text-[#7a7977] border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="px-4 py-1 rounded bg-gradient-to-r font-semibold text-white duration-300 to-[#af8071] from-[#c5a07e] hover:text-[#d3d2cf]"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm ">
              Bacon ipsum dolor amet short ribs pig sausage prosciuto chicken
              spare ribs salami.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-[#d3d2cf]">
            &copy; Copyright {new Date().getFullYear()} Pay&Buy. All rights
            reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="/"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <span className="flex justify-center duration-300 bg-[#af8071] items-center h-10 w-10 rounded-full hoverbg-[#c5a07e]">
                <FaTwitter className="text-white text-xl" />
              </span>
            </a>
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <span className="flex justify-center duration-300 bg-[#af8071] items-center h-10 w-10 rounded-full hoverbg-[#c5a07e]">
                <FaInstagram className="text-white text-xl" />
              </span>
            </a>
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
            >
              <span className="flex justify-center duration-300 bg-[#af8071] items-center h-10 w-10 rounded-full hoverbg-[#c5a07e]">
                <FaFacebookF className="text-white text-xl" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
