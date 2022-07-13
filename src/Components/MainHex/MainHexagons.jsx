import React from "react";
import style from "./_mainHexagons.modules.scss";

function MainHexagons() {
  const [cordHexe, setcordHexe] = React.useState([]);

  // Переменные размера области видимости - передать пропсами ограничение до 30
  let L = 1;
  let M = 1;
  let N = 1;
  let SIDE = 100;

  const pointsHex = "100,0 50,-87 -50,-87 -100,-0 -50,87 50,87";

  React.useEffect(() => {
    //кординаты и линии расположения хексов
    const hexes = [];

    //  Стороны хекс контейнера
    const long = L - 1;
    const height = L + M - 1;
    const width = L + N - 1;

    //  Расчитываем противоположную сторону
    const oppositeWidth = SIDE * Math.sqrt(3);
    const oppositeCounter = SIDE * 2;

    for (let horizontalLine = 0; horizontalLine < height; horizontalLine++) {
      for (let verticalLine = 0; verticalLine < width; verticalLine++) {
        if (
          (horizontalLine < long &&
            verticalLine >= long - horizontalLine &&
            verticalLine < width - (long + 1 - height + horizontalLine)) ||
          (horizontalLine >= long && horizontalLine < M) ||
          (horizontalLine >= M &&
            verticalLine >= long - horizontalLine &&
            verticalLine < width - (long + 1 - height + horizontalLine))
        ) {
          const xCord =
            verticalLine * oppositeWidth + (horizontalLine * oppositeWidth) / 2;
          const yCord =
            (horizontalLine * oppositeCounter * 3) / 4 + oppositeCounter / 2;

          hexes.push({
            id: hexes.length,
            horizontal: horizontalLine,
            vertical: verticalLine,
            x: Math.trunc(xCord),
            y: Math.trunc(yCord),
          });
        }
      }
    }

    setcordHexe(hexes);

    console.log("L " + long);
    console.log("h " + height);
    console.log("w " + width);

    console.log(hexes);
  }, [L, M, N, SIDE]);

  return (
    <div className={style.wrapper}>
      <svg viewBox="0 0 1600 600" width="600" height="600">
        {cordHexe.map((elem) => (
          <g transform={`translate(${elem.y}, ${elem.x}) `} className="hex">
            <polygon points={pointsHex}></polygon>
          </g>
        ))}
      </svg>
    </div>
  );
}
<svg viewBox="0 0 1800 1100" width="500" height="220"></svg>;
export default MainHexagons;
