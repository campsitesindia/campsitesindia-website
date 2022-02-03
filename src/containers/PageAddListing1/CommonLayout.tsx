import React, {FC, useState} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface CommonLayoutProps {
  index?: string;
  nextHref: string;
  backtHref: string;
  nextBtnText?: string;
}

const   CommonLayout: FC<CommonLayoutProps> = ({
    index=1,
  children,
  nextHref,
  nextBtnText,
  backtHref,
}) => {

  return (

        <>
        <div className="listingSection__wrap ">{children}</div>
        </>


  );
};

export default CommonLayout;
