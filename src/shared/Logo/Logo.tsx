import React from "react";
import {Link} from "react-router-dom";
import logoImg from "images/campsites/logo-2.png";
import logoLightImg from "images/logo-light.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "",
}) => {
  return (

    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
        {/*<div className="flex items-center flex-no-shrink text-white mr-6">*/}
            {/*<img*/}
                {/*className={'block max-h-12 ${imgLight ? "dark:hidden" : ""}'}*/}
                {/*src={img}*/}
                {/*alt="Logo"*/}
            {/*/>*/}
            {/*<span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>*/}
        {/*</div>*/}
      {img ? (
        <img
          className={'block max-h-12 ${imgLight ? "dark:hidden" : ""}'}
          src={img}
          alt="Logo"
        />

      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )}

    </Link>
  );
};

export default Logo;
