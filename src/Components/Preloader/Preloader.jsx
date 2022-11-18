import { observer } from "mobx-react-lite";
import React from "react";
import style from "./preload.module.scss";
const Preloader = observer(() => {
  return (
    <div className={style.wrapper}>
      <div className={style.hexBorder}>
        <div className={style.hexagons}>
          <div className={style.hexagon}></div>
          <div className={style.hexagon}></div>
          <div className={style.hexagon}></div>
          <div className={style.hexagon}></div>
          <div className={style.hexagon}></div>
          <div className={style.hexagon}></div>
          <div className={style.hexagon}></div>
        </div>
      </div>
    </div>
  );
});

export default Preloader;
