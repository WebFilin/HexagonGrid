import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetClickHexGroup from "../Components/GetClickHexGroup/GetClickHexGroup";
import GetRandomHexGroup from "../Components/GetRandomHexGroup/GetRandomHexGroup";
import SetHexSideSize from "../Components/HexSideSize/SetHexSideSize";
import RandomChange from "../Components/ControlsElem/RandomChange/RandomChange";
import SplitDomains from "../Components/SplitDomains/SplitDomains";
import ColorazeDomains from "../Components/ColorazeDomains/ColorazeDomains";
import InfoTable from "../Components/InfoTable/InfoTable";

function App() {
  return (
    <div className={style.wrapper}>
      <header className={style.header}> </header>

      <main className={style.body}>
        <DrowSvgArea />
        <div className={style.controls}>
          <SetHexSideSize />
          <RandomChange />
          <InfoTable />
        </div>
      </main>

      <footer className={style.footer} />
      <MainHexagons />
      <GetClickHexGroup />
      <GetRandomHexGroup />
      <SplitDomains />
      <ColorazeDomains />
    </div>
  );
}

export default App;
