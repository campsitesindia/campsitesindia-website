import React from "react";
import NavigationItem, {NavItemType} from "./NavigationItem";
import {NAVIGATION_DEMO} from "data/navigation";
import {ButtonProps} from "../Button/Button";
import {ButtonPrimaryProps} from "../Button/ButtonPrimary";


export interface NavigationProps {
  navigationsItems:NavItemType[],
    userName?:string | ''

}
const Navigation: React.FC<NavigationProps> = ({ navigationsItems
                                                     }) => {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">

      {navigationsItems.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
