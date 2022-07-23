import React from "react";
import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetHexGroup from "../Components/GetHexGroup/GetHexGroup";
import Domain from "../Components/Domain/Domain";
import RandomDomains from "../Components/RandomDomains/RandomDomains";

function App() {
  const [isRandomDomain, setIsRandomDomain] = React.useState(false);

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <button onClick={() => setIsRandomDomain(!isRandomDomain)}>
          Рандом
        </button>
      </header>

      <main className={style.body}>
        <DrowSvgArea />
      </main>

      <footer className={style.footer} />

      <MainHexagons />
      <GetHexGroup />
      <Domain />
      <RandomDomains isRandom={isRandomDomain} />
    </div>
  );
}

export default App;
