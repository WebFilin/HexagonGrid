import React from "react";
import style from "./drowSvgArea.module.scss";
import DomainsStore from "../../store/DomainsStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import SvgHex from "../SvgHex/SvgHex";

const MainHexagons = observer(() => {
  const svgBox = React.useRef();
  const [viewBoxSize, setViewBoxSize] = React.useState(null);

  //   Получаем массив координат
  const arrCordinatsHex = toJS(DomainsStore.arrCoordinates);

  //  Динамически управляем размером viewBox в svg
  React.useEffect(() => {
    const svgArea = svgBox.current.children;
    const boxSize = svgBox.current.getBBox();
    setViewBoxSize(boxSize);

    DomainsStore.getSvgArea(svgArea);
  }, [arrCordinatsHex.length]);

  //   Динамическое управление облатсью видимости SVG
  const sizeBox =
    viewBoxSize !== null
      ? `${viewBoxSize.x} ${viewBoxSize.y} ${viewBoxSize.width} ${viewBoxSize.height}`
      : "0 0 0 0";

  return (
    <div className={style.wrapper}>
      <svg className={style.body} ref={svgBox} viewBox={sizeBox}>
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
