import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
const NotSimplyConnectDomain = observer(({ isBtnRandom }) => {
  //  console.log(sumRandomID)
  React.useEffect(() => {
    const stackDomains = toJS(domainsStore.stackDomains);
    const arrHexRandom = toJS(domainsStore.arrVertexs);

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(domainsStore.arrCoordinates);

    //  Массив отсортированных доменов с соcедями
    const arrNeighborsDomains = [];

    //  Список связности
    let adjacencyListEmptyArea = [];

    // Все недосвязные домены
    const sumEmptyAreas = [];

    //  ID входящие в домен
    const arrIdDomains = stackDomains.map((elem) => {
      const domain = elem.idDomain;

      //  Отсекаем меленькие домены
      if (domain.length >= 6) {
        getNeighborsDomain(domain);
        return domain;
      }
    });

    //  Получаем список соседей для отсортированных доменов
    function getNeighborsDomain(domain) {
      const arrNeighbors = [];

      // Получаем соседей хексов в домене
      domain.forEach((idInDomain) => {
        return arrHexRandom.filter((elem) => {
          if (elem.id === idInDomain) {
            return arrNeighbors.push(elem);
          }
        });
      });

      arrNeighborsDomains.push(arrNeighbors);
    }

    // Находим количество пересечений сторон с доменом у свободных хексов
    function getHexConnectDomains() {
      // console.log(arrNeighborsDomains);

      // Стек всех соседий домена
      const arrConnectNeighbors = arrNeighborsDomains.map((domain) => {
        const domainsID = domain.map((elem) => {
          return elem.group;
        });

        const arrIdNeighbors = [...new Set(domainsID.flat())];

        return arrIdNeighbors;
      });

      console.log(arrConnectNeighbors);

      // Получаем связи с доменом
      const arrRepeats = arrConnectNeighbors.map((neighborID) => {
        return neighborID.reduce((acc, elem) => {
          acc[elem] = (acc[elem] || 0) + 1;
          return acc;
        }, {});
      });

      // console.log(arrRepeats);

      // Хексы вне домена но со связями c доменом от 3
      arrRepeats.forEach((objRepeats) => {
        for (let prop in objRepeats) {
          const intersect = arrIdDomains.includes(Number(prop));
          const repeats = objRepeats[prop];

          //  Сортируем пересечения
          // Если 6 пересечений массива то домен недосвязный
          if (!intersect && repeats >= 3) {
            if (repeats === 6) {
              checkSixIntersect(Number(prop));
            } else {
              checkDomainBorder(Number(prop));
            }
          }
        }
      });

      function checkSixIntersect(idHex) {
        if (sumEmptyAreas.length === 0) {
          sumEmptyAreas.push(idHex);
        } else {
          //  console.log(arrNeighbors);
          // console.log(neighborsGroup.length);
          //  neighborsGroup.forEach((neighbor) => {
          //    console.log(!neighbor.includes(idHex));
          //    if (!neighbor.includes(idHex)) {
          //    }
          //  });
        }

        //   console.log(neighborsGroup);
        //   console.log("Входящий ID " + idHex);
        //   console.log("Стек дырок " + sumEmptyAreas);
      }

      function checkDomainBorder(idHex) {}
      //   getHexConnect(stackEmptyHexId);
    }

    // Получаем всех соседий недосвязных хексов
    //  function getHexConnect(stackEmptyHexId) {
    //    const emptyNeighbors = stackEmptyHexId.map((id) => {
    //      const hexCord = arrCordMainHex.find((elem) => {
    //        return elem.id === id;
    //      });

    //      // Ищем соседий выбранного узла
    //      const getNeighbors = domainsStore.getNeighborsHex(
    //        hexCord.vertical,
    //        hexCord.horizontal
    //      );
    //      return { id: id, group: [...getNeighbors] };
    //    });

    // checkEmptyArea(emptyNeighbors);
    //  }

    //  function checkEmptyArea(emptyNeighbors) {
    //  Форируем список смежности пустой области внутри домена
    //  Структура данных  в массиве emptyNeighbors

    // emptyNeighbors =[
    //   id: 15, group: [7,16,24]
    //   id: 17, group: [8, 9, 16, 18, 25, 26]

    // ]

    // adjacencyListEmptyArea = [];

    // for (let i = 0; i < emptyNeighbors.length; i++) {
    //   const prevID = emptyNeighbors[i].id;

    //   for (let j = i + 1; j < emptyNeighbors.length; j++) {
    //     const group = emptyNeighbors[j].group;
    //     const currID = emptyNeighbors[j].id;

    //     if (group.includes(prevID)) {
    //       adjacencyListEmptyArea.push([prevID, currID]);
    //     }
    //   }
    // }

    // const emptyArea = [...new Set(adjacencyListEmptyArea.flat())];

    // console.log(adjacencyListEmptyArea);
    // console.log(emptyNeighbors);
    //   }

    getHexConnectDomains();

    infoTableStore.getSumNonSimplyDomain("-");
  }, [isBtnRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
