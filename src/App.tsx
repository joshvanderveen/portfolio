/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, MouseEvent } from "react";
import { Modal, Project } from "./components";

const App = () => {
  const [show, setShow] = useState<string | null>(null);

  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    console.log(e.currentTarget.innerText);
    setShow(e.currentTarget.innerText);
  };

  const handleToggleVisibility = () => {
    setShow(null);
  };

  document.onkeyup = (e) => {
    if (e.key === "Escape") {
      setShow(null);
    }
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
          I am a Melbourne based full stack web and mobile developer. My
          interest in software development started in high school, and further
          increased in university when I began my course, majoring in software
          development. In the last few years, I have been fortunate to work on
          many projects, and through them I have been able to further develop my
          skills in this area.
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
        <div className="projects">
          <Project
            title="Find Referral App"
            description="App for managing referrals withing a network of businesses."
            technologies={[
              "NodeJS",
              "ExpressJS",
              "MySQL",
              "React",
              "React Native",
            ]}
          />
          <Project
            title="EasyLocs"
            description="Web app for interfacing with PC Locs towers to manage the laptop bays."
            technologies={["NodeJS", "ExpressJS", "MongoDB", "React"]}
          />
          <Project
            title="Service Queue App"
            description="App for managing the service tickets for devices using our asset management system."
            technologies={["React Native"]}
          />
        </div>
      </Modal>
      <section className="left">
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
