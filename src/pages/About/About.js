import React from 'react';
import {
  FaArrowsAlt,
  FaBorderAll,
  FaGlobeAfrica,
  FaTelegramPlane,
} from 'react-icons/fa';
import useTitle from '../../hook/useTitle';

/*
#d3d2cf
#1f1713
#82441b
#aa6f35
#7a7977
#af8071
#c5a07e
#a2a7a5
#4a8fa8
#aa2c08
#80765b
#e8eceb
*/

const About = () => {
  useTitle('Pay&Buy About');
  return (
    <section
      data-aos="zoom-out"
      className="w-11/12 lg:10/12 my-12 text-md lg:text-lg lg:my-20 text-[#7a7977] font-semibold"
    >
      <h2 className="font-bold text-[#82441b] tracking-tight text-4xl">
        Tested. Proven. Better for all.
      </h2>
      <p className="my-3">
        Pay&Buy is the original reseller of professional, collectible, and
        everyday gear for camera lovers everywhere.
      </p>
      <p>
        We&#39;re camera people— photographers and videographers, collectors and
        crafters, makers, and muses.
      </p>
      <p className="my-3">
        Buy&Sell has always envisioned a better way to put rare and quality
        secondhand cameras in the hands of fellow photographers. With your
        support, we&#39;ve become the largest curated market for used (or, in
        our view, field-tested) photo and video equipment in the industry.
      </p>
      <p>
        In an age that treats every camera like a disposable camera and every
        photo like an instant photo, we believe in making the best last. Gear
        that earns the Buy&Sell stamp of approval is gear that goes further and
        reaches higher. Graded by experts. Renewed with care. One-of-a-kind.
        Sustainable. Exchangeable.
      </p>
      <p className="my-3">
        A Buy&Sell camera is an instrument of possibility. In your hands, that
        secondhand camera instantly becomes something new:
      </p>
      <p>
        An opportunity. A chance to create and share something extraordinary
        with the world.
      </p>
      <p className="my-3">
        A camera is what you make of it. We can&#39;t wait to see what develops.
      </p>
      <h2 className="text-center text-3xl lg:text-5xl my-12 font-semibold">
        EXPERIENCE THE KEY DIFFERENCE
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          data-aos="zoom-out"
          className="border-4 border-opacity-50 border-[#af8071] p-6 text-center rounded-2xl"
        >
          <span className="w-24 mb-5 h-24 inline-flex bg-[#c5a07e] bg-opacity-30 rounded-full items-center justify-center">
            <FaTelegramPlane className="text-6xl text-white" />
          </span>
          <h2 className="text-2xl mb-2 font-bold">More Freedom</h2>
          <p>
            Going beyond retail means delivering more opportunity, security,
            and, flexibility for all
          </p>
        </div>
        <div
          data-aos="zoom-out"
          className="border-4 border-opacity-50 border-[#af8071] p-6 text-center rounded-2xl"
        >
          <span className="w-24 mb-5 h-24 inline-flex bg-[#c5a07e] bg-opacity-30 rounded-full items-center justify-center">
            <FaArrowsAlt className="text-6xl text-white" />
          </span>
          <h2 className="text-2xl mb-2 font-bold">More Possibility</h2>
          <p>
            When every dollar goes further, every exchange brings new ways to
            create and explore
          </p>
        </div>
        <div
          data-aos="zoom-out"
          className="border-4 border-opacity-50 border-[#af8071] p-6 text-center rounded-2xl"
        >
          <span className="w-24 mb-5 h-24 inline-flex bg-[#c5a07e] bg-opacity-30 rounded-full items-center justify-center">
            <FaGlobeAfrica className="text-6xl text-white" />
          </span>
          <h2 className="text-2xl mb-2 font-bold">More Circularity</h2>
          <p>
            Longer gear lifecycles serve more and cost less-for you and the
            environment
          </p>
        </div>
        <div
          data-aos="zoom-out"
          className="border-4 border-opacity-50 border-[#af8071] p-6 text-center rounded-2xl"
        >
          <span className="w-24 mb-5 h-24 inline-flex bg-[#c5a07e] bg-opacity-30 rounded-full items-center justify-center">
            <FaBorderAll className="text-6xl text-white" />
          </span>
          <h2 className="text-2xl mb-2 font-bold">More Community</h2>
          <p>
            Every exchange supports and professions of follow camera lovers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
