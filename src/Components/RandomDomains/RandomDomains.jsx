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

    //  Стек ребер графа
    const linkedList = [];

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

    //  Стартуем проверки для создания доменов
    while (vertex.length > 0) {
      checkGroup();
    }

    function checkGroup() {
      const node = vertex.shift();

      vertex.forEach((elem) => {
        if (elem.edges.includes(node.id)) {
          linkedList.push([node.id, elem.id]);
        }
      });
      checkDomain();
    }

    //  Проверяем вхождение шруппы в домены
    function checkDomain() {
      const edges = linkedList.shift();

      if (domain.length === 0) {
        createDomain(edges);
      } else {
        addSubDomain(edges);
      }
    }

    function addSubDomain(edges) {
      if (edges) {
        edges.forEach((idEdges) => {
          const intersect = domain.findIndex((domain) => {
            return domain.groupCord.includes(idEdges);
          });

          if (intersect !== -1) {
            const oldState = domain[intersect].groupCord;
            domain[intersect].groupCord = [...new Set([...oldState, ...edges])];
          } else {
            createDomain(edges);
          }
        });
      }
    }

    function createDomain(edges) {
      const colorGroup = hexCordinate.randomColor();

      if (edges) {
        const objDomain = {
          idDomain: colorGroup,
          groupCord: [...edges],
        };

        domain.push(objDomain);
      }
    }

    console.log(domain);
  }, [arrElem]);

  return <div></div>;
});

export default RandomDomains;
