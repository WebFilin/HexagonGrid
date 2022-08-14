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
    //  Стек вершин графа
    const vertex = [];

    //  Стек доменов
    const domain = [];

    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);
      elemHex.style.fill = "red";

      // Получаем кординаты соседей
      const getNeighbors = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      // Добавляем обьект с вершинами и возможными связями в стек
      vertex.push({ id: hexID, edges: [...getNeighbors] });
    });

    //  Получаем только ребра графа
    while (vertex.length > 0) {
      const node = vertex.shift();

      vertex.forEach((elem) => {
        if (elem.edges.includes(node.id)) {
          const edges = [node.id, elem.id];
          checkDomain(node.id, edges);
        }
      });
    }

    function checkDomain(id, edges) {
      if (domain.length === 0) {
        createDomain(edges);
      } else {
        checkSubDomain(id, edges);
      }
    }

    function checkSubDomain(id, edges) {

      // !офыьштубика в сортировке - нужно каждый раз перебирать все значения в ребре
      const intersect = domain.findIndex((domain) => {
        return domain.groupCord.includes(id);
      });

      if (intersect !== -1) {
        const prevGroupCord = domain[intersect].groupCord;
        domain[intersect].groupCord = [
          ...new Set([...prevGroupCord, ...edges]),
        ];
      } else {
        createDomain(edges);
      }
    }

    function createDomain(edges) {
      const colorGroup = hexCordinate.randomColor();

      const objDomain = {
        idDomain: colorGroup,
        groupCord: [...edges],
      };

      domain.push(objDomain);
    }

    // Красим в цвета домена
    domain.forEach((domain) => {
      const colorHex = `${domain.idDomain}`;

      arrElem.forEach((elem) => {
        const idHex = Number(elem.id);

        if (domain.groupCord.includes(idHex)) {
          elem.style.fill = colorHex;
          elem.style.fillOpacity = 0.8;
        }
      });
    });

    console.log(domain);
  }, [arrElem]);

  return <div></div>;
});

export default RandomDomains;
