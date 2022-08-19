import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetHexGroup from "../Components/GetHexGroup/GetHexGroup";
import GetNeighborsHex from "../Components/GetNeighborsHex/GetNeighborsHex";
import SetHexSideSize from "../Components/HexSideSize/SetHexSideSize";
import RandomChange from "../Components/ControlsElem/RandomChange/RandomChange";
import DFS from "../Components/DFS/DFS";
import SplitDomains from "../Components/SplitDomains/SplitDomains";
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
      <GetHexGroup />
      <GetNeighborsHex />
      <DFS />
      <SplitDomains />
    </div>
  );
}

export default App;
