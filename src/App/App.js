import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetClickHexGroup from "../Components/GetClickHexGroup/GetClickHexGroup";
import GetRandomHexGroup from "../Components/GetRandomHexGroup/GetRandomHexGroup";
import SetHexSideSize from "../Components/SetHexSideSize/SetHexSideSize";
import BtnRandomChange from "../Components/ControlsElem/BtnRandomChange/BtnRandomChange";
import SplitDomains from "../Components/SplitDomains/SplitDomains";
import ColorazeDomains from "../Components/ColorazeDomains/ColorazeDomains";
import CheckDomains from "../Components/CheckDomains/CheckDomains";
import DrowTable from "../Components/DrowTable/DrowTable";

function App() {

  return (
    <div className={style.wrapper}>
      <header className={style.header}> </header>

      <main className={style.body}>
        <DrowSvgArea />
        <div className={style.controls}>
          <SetHexSideSize />
          <BtnRandomChange />
          <DrowTable />
        </div>
      </main>

      <footer className={style.footer} />
      <MainHexagons />
      <GetClickHexGroup />
      <GetRandomHexGroup />
      <SplitDomains />
      <CheckDomains />
      <ColorazeDomains />
    </div>
  );
}

export default App;
