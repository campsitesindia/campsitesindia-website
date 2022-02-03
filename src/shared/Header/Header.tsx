import React, {FC, useEffect, useState} from "react";
import MainNav1 from "./MainNav1";
import {Helmet} from "react-helmet";
import {useAppSelector} from "../../campsitesindia/config/store";

export interface HeaderProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const [isTop, setisTop] = useState(true);
   // const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);

  function scrollFunction() {
    const $head = document.getElementById("nc-chifis-header");
    if (!$head) return;
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      !!isTop && setisTop(false);
    } else {
      setisTop(true);
    }
  }

  return (
    <div
      id="nc-chifis-header"
      className="nc-Header lg:sticky lg:top-0 w-full lg:left-0 lg:right-0 z-40"
    >
      <Helmet>
        <title>Campsites India</title>
      </Helmet>

      {/* NAV */}
      <MainNav1 isTop={isTop} isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin} />
    </div>
  );
};

export default Header;
