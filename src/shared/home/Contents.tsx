import React from "react";
import "./contents.css";
import {IContent} from "./ContentModel";


export const Contents = (props: IContent ) => {


 return (
    <div className="contents">
      <div className={props.big ? "bigcontents__list" : "contents__list"} key={props.id}>
        <img src={props.img} width={"100%"} alt="contents" />
        <div className="content__des">
          <h3>{props.title}</h3>
          <h6>{props.description}</h6>
          <h3>{props.amount}</h3>
        </div>
      </div>
    </div>
  );
}
export default Contents;
