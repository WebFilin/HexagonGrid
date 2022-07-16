import { observer } from "mobx-react-lite";
import React from "react";

import hexCordinate from "../../state/hexCordinate";

const HexGroup = observer(() => {
  // массив координат
  const arrCoordinates = hexCordinate.arrCoordinates;

  //   Выбранный хекс
  const hex = hexCordinate.hexObj;

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

  return <></>;
});

export default HexGroup;
