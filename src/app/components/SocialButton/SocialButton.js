import React from "react";

const SocialButton = ({ link, icon, backColor, textColor }) => {
  return (
    <a href={link} className="m-12 cursor-pointer">
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
