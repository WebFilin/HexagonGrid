import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;
  const ratio = 0.5;

  //   Массив элементов DOM в рандоме
  const arrElem = [];

  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexGroup = Array.from(elem.children);

      // Сброс стилей хексов
      hexGroup[0].style = { fill: null, fillOpacity: 0.3 };
      // hexs[1].textContent = 0;

      if (Math.random() <= ratio) {
        arrElem.push(hexGroup[0]);
      }
    });
  }, [isRandom]);

  React.useEffect(() => {
    const elemHexagonGrid = [];

    // массив координат
    const arrCoordinates = toJS(hexCordinate.arrCoordinates);
    const nodeCordID = [];

    arrElem.forEach((elem) => {
      elem.style.fill = "green";
      //    elem.style.fillOpacity = 0.8;
      const hexVert = Number(elem.getAttribute("vertical"));
      const hexHoriz = Number(elem.getAttribute("horizontal"));
      const hexID = Number(elem.id);
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
      result.map((elem) => {
        const hexIdGroup = Number(elem.id);
        elemHexagonGrid.push(hexIdGroup);
      });

      // Составляем узел графа
      const peak = {
        hexId: hexID,
        group: Array.from(new Set(elemHexagonGrid)),
      };
      nodeCordID.push(peak);
    });

   console.log(nodeCordID)
  }, [arrElem]);

  return <div></div>;
});

export default RandomDomains;
