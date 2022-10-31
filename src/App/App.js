import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetClickHexGroup from "../Components/GetClickHexGroup/GetClickHexGroup";
import GetRandomHexGroup from "../Components/GetRandomHexGroup/GetRandomHexGroup";
import SetHexSideSize from "../Components/SetHexSideSize/SetHexSideSize";
import BtnAutoChange from "../Components/ControlsElem/BtnAutoChange/BtnAutoChange";
import SplitDomains from "../Components/SplitDomains/SplitDomains";
import ColorazeDomains from "../Components/ColorazeDomains/ColorazeDomains";
import CheckDomains from "../Components/CheckDomains/CheckDomains";
import GetInfoForTable from "../Components/GetInfoForTable/GetInfoForTable";
import DrowTable from "../Components/DrowTable/DrowTable";

function App() {
  return (
    <div className={style.wrapper}>
      <header className={style.header}> </header>
      <main className={style.body}>
        <DrowSvgArea />
        <div className={style.controls}>
          <SetHexSideSize />
          <BtnAutoChange />
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
      <GetInfoForTable />
    </div>
  );
}

export default App;
