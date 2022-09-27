import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import React from "react";
import infoTableStore from "../../store/infoTableStore";
import domainsStore from "../../store/domainsStore";

const getEmptyAreaInDomain = observer(({ hexConnect }) => {
  React.useEffect(() => {
    // Стек недосвязныx доменов
    const sumEmptyAreasDomains = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(domainsStore.arrCoordinates);

    hexConnect.forEach((domain) => {
      checkArea(domain);
    });

    function checkArea(domain) {
      // Количество пересечений хексов с доменом
      const intersectHexs = domain.hexs;

      // Текущий домен
      const currDomain = domain.currDomain;

      // Номер домена в стеке
      const numDomain = domain.numDomain;

      //   Получаем количество связей с доменом, убираем id входящие в домены
      for (let prop in intersectHexs) {
        const intersect = currDomain.includes(Number(prop));
        const hexLinkDomain = intersectHexs[prop];
        const hexNeighbours = getNeighbors(Number(prop));

        if (!intersect && hexLinkDomain >= 3 && hexNeighbours.length > 4) {
          const emptyHex = {
            id: Number(prop),
            numDomain: numDomain,
            hexNeighbours: hexNeighbours,
          };

          // Сортируем по количеству связей
          if (hexLinkDomain === 6) {
            //   checkSixIntersect(emptyHex);
          } else {
            checkOtherIntersect(emptyHex, currDomain);
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

      // Стек пустой области
      const emptyArea = [];

      if (!repeatedDomain) {
        getEmptyArea(emptyHex.id);
      }

      function getEmptyArea(startNode) {
        emptyArea.push(startNode);

        //   Рекпучивно формируем свободную область графа
        function getHexLink() {
          return emptyArea.forEach((id) => {
            // Получаем соседий элементов
            const getHexNeighbours = getNeighbors(id);

            // Не входящие в массив соседи хекса
            const emptyHexs = getEmptyHexs(getHexNeighbours, currDomain);

            // Повторные элементы в массиве
            const nonRepeats = checkCloneHex(emptyArea, emptyHexs);

            if (nonRepeats.length > 0 && getHexNeighbours.length > 4) {
              emptyArea.push(...nonRepeats);
              getHexLink();
            } else return;
          });
        }
        getHexLink();
      }
      console.log(emptyArea);
    }

    //  Поиск повторов в домене
    function checkCloneHex(emptyArea, emptyHexs) {
      return emptyHexs.filter((id) => !emptyArea.includes(id));
    }

    //  Отфильтровываем пересечения с доменом
    function getEmptyHexs(hexNeighbours, currDomain) {
      return hexNeighbours.filter((id) => !currDomain.includes(id));
    }

    //  Проверяем повторение недосвязных доменов при добавлении в общий стек
    function checkRepeatedDomain(numDomain) {
      return sumEmptyAreasDomains.some((elem) => {
        return elem.numDomain === numDomain;
      });
    }

    //  Соседи элементов
    function getNeighbors(id) {
      const hexCord = arrCordMainHex.find((hex) => {
        return hex.id === id;
      });

      // Находим всех соседий хекса
      const hexConnect = domainsStore.getNeighborsHex(
        hexCord.vertical,
        hexCord.horizontal
      );
      return hexConnect;
    }

    infoTableStore.getSumNonSimplyDomain("-");
  }, [hexConnect]);

  return <div></div>;
});

export default getEmptyAreaInDomain;
