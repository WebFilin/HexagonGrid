import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;

  //   Массив элементов DOM
  const arrElem = [];

  React.useEffect(() => {
    const ratio = toJS(hexCordinate.randomRatio);
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hex = elem.firstChild;
      const hexTxt = elem.lastChild;

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      // hexTxt.textContent = null;

      if (Math.random() <= ratio) {
        //   hexTxt.textContent = hex.id;
        arrElem.push(hex);
      }
    });
  }, [isRandom, arrElem]);

  React.useEffect(() => {
    //  Стек ребер графа
    const relationships = {};

    const arrHexID = [];

    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);
      elemHex.style.fill = "red";

      // Получаем кординаты соседий
      const getNeighbors = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      // Добавляем обьект с вершинами и ребрами в стек графа
      relationships[hexID] = {
        id: hexID,
        edges: [...getNeighbors],
      };

      arrHexID.push(hexID);
    });

    //  Стек доменов
    const domain = [];

    function checkDomain(hexID) {
      let edges = null;

      for (let key in relationships) {
        if (relationships[key].id === hexID) {
          edges = relationships[key].edges;
        }
      }

      const intersect = domain.findIndex((domain) => {
        return domain.groupCord.includes(hexID);
      });

      // console.log("Пересечене " + intersect, "ID " + hexID);

      if (domain.length === 0) {
        createDomain(hexID, edges);
      } else {
        if (intersect !== -1) {
          addSubDomain(intersect, hexID, edges);
        } else {
          createDomain(hexID, edges);
        }
      }
    }

    function createDomain(hexID, edges) {
      const colorGroup = hexCordinate.randomColor();

      //   Структура одной группы в стеке доменов
      const objDomain = {
        idDomain: colorGroup,
        hexsID: [hexID],
        groupCord: [...edges],
      };

      domain.push(objDomain);
    }

    function addSubDomain(intersect, hexID, edges) {
      const arrCord = domain[intersect].groupCord;
      const arrId = domain[intersect].hexsID;

      arrCord.push(...edges);
      arrId.push(hexID);
    }

    arrHexID.forEach((hexID) => {
      checkDomain(hexID);
    });

    console.log(domain);
  }, [arrElem]);

  return <div></div>;
});

export default RandomDomains;
