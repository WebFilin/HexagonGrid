import React from "react";
import style from "./drowSvgArea.modules.scss";
import hexCordinate from "../../state/hexCordinate";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import SvgHex from "../SvgHex/SvgHex";

const MainHexagons = observer(() => {
  const svgBox = React.useRef();
  const [viewBoxSize, setViewBoxSize] = React.useState(null);

  //   Получаем массив координат через mobx
  const arrCordinatsHex = toJS(hexCordinate.arrCoordinates);

  //  Динамически управляем размером viewBox в svg
  React.useEffect(() => {
    const boxSize = svgBox.current.getBBox();
    setViewBoxSize(boxSize);
  }, [arrCordinatsHex.length]);

  //   Динамическое управление облатсью видимости
  const sizeBox =
    viewBoxSize !== null
      ? `${viewBoxSize.x} ${viewBoxSize.y} ${viewBoxSize.width} ${viewBoxSize.height}`
      : "0 0 0 0";

  return (
    <div className={style.wrapper}>
      <svg
        ref={svgBox}
        viewBox={sizeBox}
        style={{ border: "1px solid #333333" }}
        width="200%"
        height="200%"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Выводим хексы, смещаем их по сетке координат */}
        {arrCordinatsHex.map((elem) => (
          <SvgHex
            key={elem.id}
            id={elem.id}
            x={elem.x}
            y={elem.y}
            vertical={elem.vertical}
            horizontal={elem.horizontal}
          />
        ))}
      </svg>
    </div>
  );
});

export default MainHexagons;
