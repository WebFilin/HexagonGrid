import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;
  const ratio = 0.5;

  //   Массив элементов DOM
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
    // массив координат всей сетки
    const arrCoordinates = toJS(hexCordinate.arrCoordinates);
    const colorGroup = hexCordinate.randomColor();

    //  обьект кординат вокруг узла
    const nodeCord = [];

    //  Ищем соседий элементов
    arrElem.forEach((elemHex) => {
      // elemHex.style.fill = colorGroup;
      //    elem.style.fillOpacity = 0.8;
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);

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

      const idHexGroup = result.map((elem) => {
        return elem.id;
      });

      // Составляем узел графа
      const peak = { id: hexID, group: [...idHexGroup] };
      nodeCord.push(peak);
    });

    arrElem.forEach((elemHex) => {
      const hexID = Number(elemHex.id);
      nodeCord.forEach((elem) => {
        const cordGroup = elem.group;
        if (cordGroup.includes(elem.id)) {
          elemHex.style.fill = "green";
          console.log("Группа");
          console.log(hexID);
        } else {
          elemHex.style.fill = "red";
          console.log("Отдельный элемент");
          console.log(hexID);
        }
      });
    });
  }, [arrElem]);

  return <div></div>;
});

export default RandomDomains;
