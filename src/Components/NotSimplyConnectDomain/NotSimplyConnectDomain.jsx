import { get, toJS } from "mobx";
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

    //  Список свободных элементов в домене
    const areaInDomain = new Set();

    //  Свободные элементы в домене
    const emptyHexs = new Set();

    // Все недосвязные домены
    const sumEmptyAreasDomains = [];

    //  ID входящие в домен
    stackDomains.forEach((elem, numDomain) => {
      const domain = elem.idDomain;

      //  Отсекаем короткие домены
      if (domain.length >= 6) {
        getNeighborsDomain(domain, numDomain);
        return domain;
      }
    });

    //  Получаем список соседей для длинных доменов
    function getNeighborsDomain(currDomain, numDomain) {
      // Получаем хексы вокруг домена
      const arrNeighbors = currDomain.map((idInDomain) => {
        const [id, group] = arrHexRandom.filter((elem) => {
          if (elem.id === idInDomain) {
            return elem;
          }
        });

        return { ...id, ...group };
      });
      getHexConnectDomains(arrNeighbors, currDomain, numDomain);
    }

    // Находим количество пересечений сторон с доменом у свободных хексов
    function getHexConnectDomains(arrNeighbors, currDomain, numDomain) {
      if (arrNeighbors) {
        checkConnect();
      }

      function checkConnect() {
        // Стек всех соседий домена
        const neighborID = arrNeighbors
          .map((domain) => {
            return domain.group;
          })
          .flat();

        // Получаем количество связей между хексами и доменом
        const intersectHexs = neighborID.reduce((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});

        //   Полаем количество связей с доменом, убираем id входящие в домены
        for (let prop in intersectHexs) {
          const intersect = currDomain.includes(Number(prop));
          const connect = intersectHexs[prop];

          if (!intersect && connect >= 3) {
            const emptyHex = { id: Number(prop), numDomain: numDomain };

            // Сортируем по количеству связей
            if (connect === 6) {
              checkSixIntersect(emptyHex);
            } else {
              checkOtherIntersect(emptyHex, currDomain);
            }
          }
        }
      }
    }

    // Если связей 6 - то домен недосвязный, записываем сразу
    function checkSixIntersect(emptyHex) {
      // Добавляем стартовый элемент в стек
      if (sumEmptyAreasDomains.length === 0) {
        sumEmptyAreasDomains.push(emptyHex);
      }
      //  Проверяем повторы доменов, добавляем если нет
      else {
        const repeatedDomain = checkRepeatedDomain(emptyHex.numDomain);
        if (!repeatedDomain) {
          sumEmptyAreasDomains.push(emptyHex);
        }
      }
    }

    //  ОБрабатываем другие хексы со связями меньше 6, получаем связи в пустых зонах
    function checkOtherIntersect(emptyHex, currDomain) {
      //  Проверяем повторы доменов, добавляем если нет
      const repeatedDomain = checkRepeatedDomain(emptyHex.numDomain);
      if (!repeatedDomain) {
        checOtherHex();
      }

      function checOtherHex() {
        // Соседи каждого элемента
        const neighbors = getNeighbors(emptyHex.id);
        //   Проверяем элементы края решетки
        if (neighbors.length >= 4) {
          const inDomains = checkHexInStack(neighbors, currDomain);

          if (inDomains.length >= 2) {
            emptyHexs.add(emptyHex.id, ...inDomains);
          }

          console.log(emptyHexs);
          //  console.log(inDomains);
          //  console.log(emptyHex.id, neighbors);
        }
      }
    }

    //  Вхождение хекса в домен
    function checkHexInStack(checkArr, currDomain) {
      return checkArr.filter((id) => !currDomain.includes(id));
    }

    //  Соседи элементов
    function getNeighbors(id) {
      const hexCord = arrCordMainHex.find((elem) => {
        return elem.id === id;
      });

      // Находим всех соседий хекса
      const hexConnect = domainsStore.getNeighborsHex(
        hexCord.vertical,
        hexCord.horizontal
      );
      return hexConnect;
    }

    //  Проверяем повторение недосвязных доменов при добавлении в общий стек
    function checkRepeatedDomain(numDomain) {
      return sumEmptyAreasDomains.some((elem) => {
        return elem.numDomain === numDomain;
      });
    }

    getHexConnectDomains();
    //  getEmptyArea();
    //   console.log(areaInDomain);
    //  console.log(sumEmptyAreasDomains);
    infoTableStore.getSumNonSimplyDomain("-");
  }, [isBtnRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
