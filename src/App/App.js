import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";
import GetHexGroup from "../Components/GetHexGroup/GetHexGroup";
import Domain from "../Components/Domain/Domain";

function App() {
  return (
    <div className={style.wrapper}>
      <header className={style.header} />

      <main className={style.body}>
        <DrowSvgArea />
      </main>

      <footer className={style.footer} />

      <MainHexagons />
      <GetHexGroup />
      <Domain />
    </div>
  );
}

export default App;
