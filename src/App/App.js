import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetHexGroup from "../Components/GetHexGroup/GetHexGroup";
import Domain from "../Components/Domain/Domain";
import RandomDomains from "../Components/RandomDomains/RandomDomains";
import BtnRandom from "../Components/ControlsElem/RandomDomainInput/RandomDomainInput";
import SetHexSideSize from "../Components/HexSideSize/SetHexSideSize";

function App() {
  return (
    <div className={style.wrapper}>
      <header className={style.header}></header>

      <main className={style.body}>
        <DrowSvgArea />
        <div className={style.controls}>
          <SetHexSideSize />
          <BtnRandom />
        </div>
      </main>

      <footer className={style.footer} />

      <MainHexagons />
      <GetHexGroup />
      <Domain />
      <RandomDomains />
    </div>
  );
}

export default App;
