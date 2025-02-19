import { MouseEventHandler } from "react";
import "./TransparentBtn.css";

const TransparentBtn = ({
  children,
  func,
}: {
  children: string;
  func: MouseEventHandler;
}) => {
  return (
    <button className="ghost" id="signIn" onClick={func}>
      {children}
    </button>
  );
};

export default TransparentBtn;
