import React, {FC} from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import {LOGGED_IN, NAVIGATION_DEMO, NAVIGATION_HOST} from "data/navigation";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
import ButtonCircle from "../Button/ButtonCircle";
import ButtonSecondary from "../Button/ButtonSecondary";
import {useAppSelector} from "../../campsitesindia/config/store";
import {getAccount} from "../reducers/authentication";

export interface MainNav1Props {
  isTop: boolean;
  isAuthenticated: boolean;
  isAdmin:boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop,isAuthenticated,isAdmin }) => {
    const account = useAppSelector(state => state.authentication.account);
  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation navigationsItems={NAVIGATION_DEMO} />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            {/*<SwitchDarkMode />*/}
              <SearchDropdown />
              {isAuthenticated ? (

                  <div className="px-1">
                      < ButtonPrimary href="/add-listing">Become A Host</ButtonPrimary>
                  </div>

                  ):(<div/>)
              }

              {isAuthenticated ? (

                  <div className="px-1">

                        <Navigation navigationsItems={LOGGED_IN}  />

                  </div>
              ) : (
                  <div className="px-1">
                  < ButtonSecondary >
                      <Navigation navigationsItems={NAVIGATION_HOST}  />
                  </ButtonSecondary>

                  </div>

                  )}
          </div>


          <div className="flex items-center xl:hidden">
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
