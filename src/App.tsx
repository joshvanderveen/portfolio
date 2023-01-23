/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, MouseEvent } from "react";
import { Modal } from "./components";

const App = () => {
  const [show, setShow] = useState<string | null>(null);

  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    console.log(e.currentTarget.innerText);
    setShow(e.currentTarget.innerText);
  };

  const handleToggleVisibility = () => {
    setShow(null);
  };

  return (
    <main>
      <Modal
        toggleVisibility={handleToggleVisibility}
        show={show === "ABOUT"}
        background={1}
      >
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          consequuntur quos voluptatum quas quidem. Quisquam, quae. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          consequuntur quos voluptatum quas quidem. Quisquam, quae.
        </p>
      </Modal>
      <Modal
        toggleVisibility={handleToggleVisibility}
        show={show === "EXPERIENCE"}
        background={2}
      >
        <h1>Experience</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          consequuntur quos voluptatum quas quidem. Quisquam, quae. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          consequuntur quos voluptatum quas quidem. Quisquam, quae.
        </p>
      </Modal>
      <Modal
        toggleVisibility={handleToggleVisibility}
        show={show === "PROJECTS"}
        background={3}
      >
        <h1>Projects</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          consequuntur quos voluptatum quas quidem. Quisquam, quae. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          consequuntur quos voluptatum quas quidem. Quisquam, quae.
        </p>
      </Modal>
      <section>
        <div className="title__name">
          <h1>Hello, I'm</h1>
          <h1>Josh</h1>
        </div>
      </section>
      <section className="column">
        <div className="title__link">
          <a onClick={handleClickLink}>About</a>
        </div>
        <div className="title__link">
          <a onClick={handleClickLink}>Experience</a>
        </div>
        <div className="title__link">
          <a onClick={handleClickLink}>Projects</a>
        </div>
      </section>
    </main>
  );
};

export default App;
