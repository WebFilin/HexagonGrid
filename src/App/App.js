import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetClickHexGroup from "../Components/GetClickHexGroup/GetClickHexGroup";
import GetRandomHexGroup from "../Components/GetRandomHexGroup/GetRandomHexGroup";
import SetHexSideSize from "../Components/SetHexSideSize/SetHexSideSize";
import RandomChange from "../Components/ControlsElem/RandomChange/RandomChange";
import SplitDomains from "../Components/SplitDomains/SplitDomains";
import ColorazeDomains from "../Components/ColorazeDomains/ColorazeDomains";
import CheckDomains from "../Components/CheckDomains/CheckDomains";
import NotSimplyConnectDomain from "../Components/NotSimplyConnectDomain/NotSimplyConnectDomain";
import GetInfoTable from "../Components/GetInfoTable/GetInfoTable";

function App() {
  return (
    <div className={style.wrapper}>
      <header className={style.header}> </header>

      <main className={style.body}>
        <DrowSvgArea />
        <div className={style.controls}>
          <SetHexSideSize />
          <RandomChange />
          <GetInfoTable />
        </div>
      </main>

      <footer className={style.footer} />
      <MainHexagons />
      <GetClickHexGroup />
      <GetRandomHexGroup />
      <SplitDomains />
      <CheckDomains />
      <ColorazeDomains />
      <NotSimplyConnectDomain />
    </div>
  );
}

export default App;
