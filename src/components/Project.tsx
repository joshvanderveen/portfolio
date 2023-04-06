import React, { FC } from "react";

type Props = {
  title: string;
  description: string;
  technologies?: string[];
};

const Project: FC<Props> = ({ title, description, technologies }) => {
  return (
    <div className="project__container">
      <h1 className="project__title">{title}</h1>
      <p className="project__description">{description}</p>
      {technologies ? (
        <div className="project__techs">
          {technologies.map((t) => (
            <div className="project__tech">{t}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Project;
