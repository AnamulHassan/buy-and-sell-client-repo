import React from 'react';
import useTitle from '../../hook/useTitle';

const Blog = () => {
  useTitle('Pay&Buy Blog');
  return (
    <section
      data-aos="zoom-out"
      className="w-11/12 lg:10/12 my-12 lg:my-20 text-[#7a7977] font-semibold space-y-6"
    >
      <article className="space-y-2">
        <h2 className="text-[#1f1713] font-bold text-2xl mb-2">
          What are the different ways to manage a state in React application?
        </h2>
        <p>
          The state of any application is represented by the user interface of
          the application. The state is mutable and whenever the user interacts
          with the application and changes its state, the user interface of the
          app may change as it will be represented by the new state. These
          states can be managed by a React component. The main objectives of the
          react component are to store the state and allow it to get updated
          once the user interacts with the application.
        </p>
        <p>
          React State: useState hook in React is used by many React beginners
          when they first start using state in React. The initial state is taken
          as an argument in useState hook. Initially when the React component
          renders, and returns two values. The values are the state update
          function and the current state. For displaying the current state of
          the component current state is used and for changing the current state
          the state update function is used.
        </p>
        <p>
          React State: useReducer The idea of React&#39;s useReducer has been
          taken from JavaScript Reducer. Generally, the current state is held by
          the Reducer along with action with payload and then it results out the
          new state. We can increase, decrease, and reset the value of the
          counter.
        </p>
        <p>
          React State: With Redux, the state can be managed globally by the use
          of an external force. The Redux Reducer&#39;s work is to act upon two
          Redux actions and there is no dependency on the Redux Library.
        </p>
      </article>
      <article>
        <h2 className="text-[#1f1713] font-bold text-2xl mb-2">
          How does prototypical inheritance work?
        </h2>
        <p>
          Everything in Javascript is an object. Even when creating a Class is
          an Object via an Object Literal or Constructor Function. This is how
          Javascript does class-based programming as to other traditional
          Object-Oriented Programming languages where they use the keyword
          &#39;class&#39; and &#39;inheritance&#39;.
        </p>
        <p>
          Javascript&#39;s version of class-based programming and other
          traditional class-based programming languages work with the same
          concept but does not work exactly similar. There are differences in
          its keyword, syntax, and how it works. There are also debates
          regarding pros and cons of Javascript&#39;s version of class-based
          programming, but for simplicity&#39;s sake and learning purposes, I do
          not want to go over those issues.
        </p>
        <p>
          So, the core idea of Prototypal Inheritance is that an object can
          point to another object and inherit all its properties. The main
          purpose is to allow multiple instances of an object to share common
          properties, hence, the Singleton Pattern.
        </p>
        <p>
          Below is a sample code with comments and caption to better see how it
          works:
        </p>
        <p>
          After going through the code, its best to read further about
          Prototypal Inheritance from mozilla doc. Code example below is just
          one of many ways of implementing Prototypal Inheritance.
        </p>
      </article>
      <article>
        <h2 className="text-[#1f1713] font-bold text-2xl mb-2">
          What is unit test? Why should we write unit texts?
        </h2>
        <p>
          A unit test is a way of testing a unit - the smallest piece of code
          that can be logically isolated in a system. In most programming
          languages, that is a function, a subroutine, a method or property.
        </p>
        <p>
          Unit Testing is important because software developers sometimes try
          saving time doing minimal unit testing and this is myth because
          inappropriate unit testing leads to high cost Defect fixing during
          System Testing, Integration Testing and even Beta Testing after
          application is built. If proper unit testing is done in early
          development, then it saves time and money in the end.
        </p>
        <p>
          Developers looking to learn what functionality is provided by a unit
          and how to use it can look at the unit tests to gain a basic
          understanding of the unit API.
        </p>
        <p>
          Unit testing allows the programmer to refactor code at a later date,
          and make sure the module still works correctly (i.e. Regression
          testing). The procedure is to write test cases for all functions and
          methods so that whenever a change causes a fault, it can be quickly
          identified and fixed.
        </p>
        <p>
          Due to the modular nature of the unit testing, we can test parts of
          the project without waiting for others to be completed.
        </p>
      </article>
      <article>
        <h2 className="text-[#1f1713] font-bold text-2xl mb-2">
          What are the differences React vs Angular vs Vue?
        </h2>
        <h3 className="font-bold">Angular JS:</h3>
        <p>
          Angular is an open-source dynamic web application framework. It came
          in 2009 by Misko Hevery and Adam Abrons and is currently maintained by
          Google. It also uses HTML as a template language for extending its
          context and to create various application components.
        </p>
        <ul className="list-disc ml-6">
          <li>Create richer web applications.</li>
          <li>
            Provides an option to write the client-side application in
            JavaScript using MVC way.
          </li>
          <li>
            It automatically curbs the JavaScript code for each browser.
            Therefore, it is cross-compliant.
          </li>
          <li>Licensed under Apache 2.0</li>
          <li>
            Creates large-scale, high-performance applications that users widely
            use.
          </li>
        </ul>
        <h3 className="font-bold">React JS:</h3>
        <p>
          React.js or React JS or simply React are the different names of this
          framework. It is a JavaScript library that was released in 2013 and
          developed by Jordan Walke. It is an open-source, front-end framework
          used for building UI frameworks.
        </p>
        <ul className="list-disc ml-6">
          <li>
            The journey to make React solves painless UI development by being
            interactive. It can design simple views for each state in the
            application, and in the backend, react will render and update the
            data for the right components. The declarative feature makes our
            code very predictable and is easier to debug.
          </li>
          <li>
            React builds the components in an encapsulated manner to manage
            their state and compose to make complex User interfaces. Since the
            component logics are written in JS, data can be passed through the
            app, keeping DOM's state out.
          </li>
          <li>
            No need to bother about any of the technology stacks; new features
            can be added without rewriting existing code.
          </li>
        </ul>
        <h3 className="font-bold">React JS:</h3>
        <p>
          Vue JS is a progressive JavaScript framework that uses MVVM (Model
          view view Model) for Building interfaces and single-page applications.
          It was created by Evan Vu and released in February 2014. Vue JS is
          written in JavaScript and typescript.
        </p>
        <ul className="list-disc ml-6">
          <li>
            If you know the basics of HTML, CSS, and JavaScript, we can start
            building the applications in Vue.
          </li>
          <li>
            It has an adoptable incremental system that incrementally scales
            between a library and a full-featured framework.
          </li>
          <li>
            It has fast DOM and minimal optimization efforts. The minimum size
            is 20KB and gzip size.
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Blog;
