import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexCordinate from "../../state/hexCordinate";

const HexGroup = observer(() => {
  // массив координат
  const arrCoordinates = toJS(hexCordinate.arrCoordinates);

  //   Выбранный хекс
  const hex = hexCordinate.hexObj;

  // Ищем соседий хекса
  React.useEffect(() => {
    if (hex) {
      const hexVert = Number(hex.getAttribute("vertical"));
      const hexHoriz = Number(hex.getAttribute("horizontal"));

      let elemCordGrid = [];

      // Ищем соседий выбранного узла
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

      // Обрезаем лишние данные кординат для отрисовки
      result.map((elem) => {
        let objCord = {
          id: Number(elem.id),
        };
        elemCordGrid.push(objCord);
      });

      // Составляем узел графа
      let peak = { hexId: Number(hex.id), group: elemCordGrid };

      hexCordinate.getHexGroup(peak);
    }
  }, [arrCoordinates, hex]);

  return <></>;
});

export default HexGroup;
