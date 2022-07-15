import React from "react";
import style from "./drowSvgArea.modules.scss";
import hexCordinate from "../../state/hexCordinate";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const MainHexagons = observer(() => {
  const svgBox = React.useRef();
  const [viewBoxSize, setViewBoxSize] = React.useState(null);

  let hexStyle = {
    stroke: "black",
    fillOpacity: "0.3",
    cursor: "pointer",
    fill: "gray",

    //  передача свойства через значение обьекта
    textPos: "middle",
    fontSize: "30",
    //  rotate: "rotate(30)",
    transform: "",
    points: "100,0 50,-87 -50,-87 -100,-0 -50,87 50,87",
  };

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

  //   Выбираем хекс
  function handlerClick(evElem) {
    const hex = evElem.target;
    hexCordinate.getHex(hex);
  }

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
          <g key={elem.id} transform={`translate(${elem.x}, ${elem.y})`}>
            <polygon
              id={elem.id}
              vertical={elem.vertical}
              horizontal={elem.horizontal}
              style={hexStyle}
              //   transform={hexStyle.rotate}
              points={hexStyle.points}
              onClick={(evClick) => {
                handlerClick(evClick);
              }}
            ></polygon>
            <text
              textAnchor={hexStyle.textPos}
              dominantBaseline={hexStyle.textPos}
              fontSize={hexStyle.fontSize}
            >
              {elem.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
});

export default MainHexagons;
