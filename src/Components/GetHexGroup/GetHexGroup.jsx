import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexCordinate from "../../state/hexCordinate";

const GetHexGroup = observer(() => {
  //   Выбранный хекс получаем или при клике или рандомом
  const hex = hexCordinate.hexObj;

  // Ищем соседий хекса
  React.useMemo(() => {
    // массив всех координат
    const arrCoordinates = toJS(hexCordinate.arrCoordinates);

    if (hex) {
      const hexVert = Number(hex.getAttribute("vertical"));
      const hexHoriz = Number(hex.getAttribute("horizontal"));

      // Ищем соседий выбранного узла
      const result = arrCoordinates.filter((elem) => {
        return (
          (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert) ||
          (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert + 1) ||
          (elem.vertical === hexVert + 1 && elem.horizontal === hexHoriz) ||
          (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert) ||
          (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert - 1) ||
          (elem.vertical === hexVert - 1 && elem.horizontal === hexHoriz)
        );
      });

      // Обрезаем лишние данные для составления узла с зависимостями по ID
      const elemHexagonGrid = result.map((elem) => {
        return Number(elem.id);
      });

      // Составляем узел графа
      const peak = { hexId: Number(hex.id), group: elemHexagonGrid };

      hexCordinate.getHexGroup(peak);
    }
  }, [hex]);

  return <></>;
});

export default GetHexGroup;
