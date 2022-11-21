import React from "react";
import { observer } from "mobx-react-lite";
import style from "./app.module.scss";
import DomainsStore from "../Store/DomainsStore";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetClickHexGroup from "../Components/GetClickHexGroup/GetClickHexGroup";
import GetRandomHexGroup from "../Components/GetRandomHexGroup/GetRandomHexGroup";
import SetHexSideSize from "../Components/SetHexSideSize/SetHexSideSize";
import BtnAutoChange from "../Components/ControlsElem/BtnAutoChange/BtnAutoChange";
import SplitDomains from "../Components/SplitDomains/SplitDomains";
import ColorazeDomains from "../Components/ColorazeDomains/ColorazeDomains";
import CheckDomains from "../Components/CheckDomains/CheckDomains";
import DrowTable from "../Components/DrowTable/DrowTable";
import GetNonSinglyLinkedDomain from "../Components/GetNonSinglyLinkedDomain/GetNonSinglyLinkedDomain";
import InfoForTable from "../Components/InfoForTable/InfoForTable";
import Preloader from "../Components/Preloader/Preloader";

const App = observer(() => {
  const isLoader = DomainsStore.isLoader;

  return (
    <div className={style.wrapper}>
      <header className={style.header}> </header>

      {isLoader ? (
        <Preloader />
      ) : (
        <main className={style.body}>
          <DrowSvgArea />
          <div className={style.controls}>
            <SetHexSideSize />
            <BtnAutoChange />
            <DrowTable />
          </div>
        </main>
      )}

      <MainHexagons />
      <GetClickHexGroup />
      <GetRandomHexGroup />
      <SplitDomains />
      <CheckDomains />
      <ColorazeDomains />
      <GetNonSinglyLinkedDomain />
      <InfoForTable />

      <footer className={style.footer} />
    </div>
  );
});

export default App;
