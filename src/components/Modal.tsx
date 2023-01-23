/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  toggleVisibility: () => void;
  show: boolean;
  background?: number;
};

const Modal: FC<Props> = ({
  children,
  toggleVisibility,
  show,
  background = 1,
}) => {
  const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleVisibility();
  };

  return (
    <div className={`modal ${show ? "active" : null}`}>
      <a onClick={handleClose} className="icon material-symbols-outlined">
        close
      </a>
      <>{children}</>
      <div className={`modal__background b${background}`}></div>
    </div>
  );
};

export default Modal;
