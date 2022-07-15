import style from "./app.module.scss";
import MainHexagons from "../Components/MainHexagons/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";

function App() {
  return (
    <div className={style.wrapper}>
      <header className={style.header} />

      <main className={style.body}>
        <MainHexagons />
        <DrowSvgArea />
      </main>

      <footer className={style.footer} />
    </div>
  );
}

export default App;
