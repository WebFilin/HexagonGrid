import "./app.modules.scss";
import MainHexagons from "../Components/MainHex/MainHexagons";
import DrowSvgArea from "../Components/DrowSvgArea/DrowSvgArea";

function App() {
  return (
    <div className="wrapper">
      <main>
        <MainHexagons />
        <DrowSvgArea />
      </main>
    </div>
  );
}

export default App;
