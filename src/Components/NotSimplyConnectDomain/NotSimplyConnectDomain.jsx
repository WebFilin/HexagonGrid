import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
const NotSimplyConnectDomain = observer(({ isBtnRandom }) => {
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

      //  Отсекаем короткие домены
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
      // Стек всех соседий домена
      const arrConnectNeighbors = arrNeighborsDomains.map((domain) => {
        const domainsID = domain.map((elem) => {
          return elem.group;
        });
        return domainsID.flat();
      });

      // Получаем количество связей между хексами
      const arrRepeats = arrConnectNeighbors.map((neighborID) => {
        return neighborID.reduce((acc, elem) => {
          acc[elem] = (acc[elem] || 0) + 1;
          return acc;
        }, {});
      });

      // Хексы вне домена но со связями c доменом от 3
      arrRepeats.forEach((objRepeats, index) => {
        for (let prop in objRepeats) {
          const intersect = arrIdDomains.includes(Number(prop));
          const repeats = objRepeats[prop];

          if (!intersect && repeats >= 3) {
            const emptyHex = { id: Number(prop), numDomain: index };

            // Если связей 6 - то домен недосвязный
            if (repeats === 6) {
              checkSixIntersect(emptyHex);

              //   Если меньше но связи от 3х
            } else {
              checkThreeIntersect(emptyHex);
            }
          }
        }
      });
    }

    function checkSixIntersect(emptyHex) {
      if (emptyHex) {
        check();
      }

      function check() {
        // Добавляем стартовый элемент в стек
        if (sumEmptyAreas.length === 0) {
          sumEmptyAreas.push(emptyHex);

          //  Проверяем повторы, добавляем если нет
        } else {
          const repeatedDomain = checkRepeatedDomain(emptyHex);

          if (!repeatedDomain) {
            sumEmptyAreas.push(emptyHex);
          }
        }
      }
    }

    function checkThreeIntersect(emptyHex) {

      if (emptyHex) {
         check();
       }
 
       function check() {

console.log(emptyHex)






         // // Добавляем стартовый элемент в стек
         // if (sumEmptyAreas.length === 0) {
         // //   sumEmptyAreas.push(emptyHex);
 
         //   //  Проверяем повторы, добавляем если нет
         // } else {
         //   const repeatedDomain = checkRepeatedDomain(emptyHex);
 
         //   if (!repeatedDomain) {
         //    //  sumEmptyAreas.push(emptyHex);
         //   }
         // }
       }
    }

    //  Проверяем повторение недосвязных доменов при добавлении в общий стек
    function checkRepeatedDomain(objEmptyHex) {
      const index = sumEmptyAreas.some((elem) => {
        return elem.numDomain === objEmptyHex.numDomain;
      });

      return index;
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
    console.log(sumEmptyAreas)
    infoTableStore.getSumNonSimplyDomain("-");
  }, [isBtnRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
