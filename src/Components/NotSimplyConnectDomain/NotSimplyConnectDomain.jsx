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
    const domainsLong = stackDomains.map((elem) => {
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

      // Получаем хексы вокруг домена
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
          const hexInDomain = domainsLong.includes(Number(prop));
          const connect = objRepeats[prop];

          if (!hexInDomain && connect >= 3) {
            const emptyHex = { id: Number(prop), numDomain: index };

            // Если связей 6 - то домен недосвязный
            if (connect === 6) {
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

      console.log(sumEmptyAreas);
    }

    function checkThreeIntersect(emptyHex) {
      if (emptyHex) {
        check();
      }

      //  const repeatedDomain = checkRepeatedDomain(emptyHex);
      // if (sumEmptyAreas.length === 0) {}
      function check() {
        const hexAlone = checkHexAlone(emptyHex);

        //   console.log(emptyHex);
      }
    }

    //  Отсекаем автономные хексы по краям решетки
    function checkHexAlone(emptyHex) {
      const numDomain = emptyHex.numDomain;

      const hexCord = arrCordMainHex.find((elem) => {
        return elem.id === emptyHex.id;
      });

      // Находим всех соседий свободного хекса
      const hexConnect = domainsStore.getNeighborsHex(
        hexCord.vertical,
        hexCord.horizontal
      );

      const intersect = domainsLong[numDomain].filter((id) => {
        return hexConnect.includes(id);
      });

      // console.log(intersect);

      if (hexConnect.length <= 4 && intersect.length >= 4) {
        console.log(emptyHex);
      }

      // console.log(domainsLong[numDomain]);
      // console.log(hexConnect);
    }

    //  Проверяем повторение недосвязных доменов при добавлении в общий стек
    function checkRepeatedDomain(objEmptyHex) {
      return sumEmptyAreas.some((elem) => {
        return elem.numDomain === objEmptyHex.numDomain;
      });
    }

    getHexConnectDomains();
    console.log(sumEmptyAreas);
    infoTableStore.getSumNonSimplyDomain("-");
  }, [isBtnRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
