import { showMessage } from "app/store/fuse/messageSlice";
import React from "react";
import { useDispatch } from "react-redux";

const SocialButton = ({ link, icon, backColor, textColor, copyInfo }) => {
  const dispatch = useDispatch();

  const handleCopy = () => {
    if (!navigator.clipboard) {
      alert("Your browser does not support this operation");
      return;
    }
    navigator.clipboard
      .writeText(copyInfo)
      .then(() => {
        dispatch(
          showMessage({
            message: "Copied",
            variant: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showMessage({
            message: "Something went wrong",
            variant: "error",
          })
        );
      });
  };

  if (copyInfo) {
    return (
      <div
        className="w-52 h-52 flex justify-center items-center text-white rounded-md text-24"
        style={{ backgroundColor: backColor, color: textColor }}
        onClick={handleCopy}
      >
        {icon}
      </div>
    );
  }
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="m-12 cursor-pointer"
    >
      <div
        className="w-52 h-52 flex justify-center items-center text-white rounded-md text-24"
        style={{ backgroundColor: backColor, color: textColor }}
      >
        {icon}
      </div>
    </a>
  );
};

export default SocialButton;
