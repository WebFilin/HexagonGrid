import { observer } from "mobx-react-lite";
import React from "react";

import hexCordinate from "../../state/hexCordinate";

const HexGroup = observer(() => {
  // массив координат
  const arrCoordinates = hexCordinate.arrCoordinates;

  //   Выбранный хекс
  const hex = hexCordinate.hexObj;

  // Стейт для соседий хекса
  let arrHexObj = hexCordinate.arrHexObj;

  // Ищем соседий хекса
  React.useEffect(() => {
    if (hex) {
      const hexVert = Number(hex.getAttribute("vertical"));
      const hexHoriz = Number(hex.getAttribute("horizontal"));

      let result = arrCoordinates.filter((elem) => {
        return (
          (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert) ||
          (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert + 1) ||
          (elem.vertical === hexVert + 1 && elem.horizontal === hexHoriz) ||
          (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert) ||
          (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert - 1) ||
          (elem.vertical === hexVert - 1 && elem.horizontal === hexHoriz)
        );
      });

      hexCordinate.getHexGroup(result);
    }
  }, [arrCoordinates, hex]);

  React.useEffect(() => {
    function randomColor() {
      return "#" + parseInt(Math.random() * 0xffffff).toString(16);
    }

    if (hex) {
      if (arrHexObj.includes(hex)) {
        hex.style.fill = "gray";
        hex.style.fillOpacity = 0.3;
        hexCordinate.removeHexInGrop(hex);
      } else {
        hex.style.fill = randomColor();
        hexCordinate.addHexInGrop(hex);
      }
    }
  }, [hex, arrHexObj]);

  return <></>;
});

export default HexGroup;
