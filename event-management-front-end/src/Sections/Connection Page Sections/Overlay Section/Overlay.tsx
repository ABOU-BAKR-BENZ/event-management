import "./Overlay.css";
import { TransparentBtn } from "../../../Components/index";
import { MouseEventHandler } from "react";
const Overlay = ({
  title,
  paragraph,
  handleFunc,
  btnText,
  classesToAdd,
}: {
  title: string;
  paragraph: string;
  handleFunc: MouseEventHandler;
  btnText: string;
  classesToAdd?: string;
}) => {
  return (
    <div className={`overlay-panel ${classesToAdd}`}>
      <h1>{title}</h1>
      <p>{paragraph}</p>
      <TransparentBtn func={handleFunc}>{btnText}</TransparentBtn>
    </div>
  );
};

export default Overlay;
