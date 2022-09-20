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

    //  Список свободных элементов в домене
    let areaInDomain = [];

    // Все недосвязные домены
    const sumEmptyAreasDomains = [];

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
        // Результирующий массив пустых элементов
        const resAreaInDomains = [];

        for (let prop in objRepeats) {
          const hexInDomain = domainsLong.includes(Number(prop));
          const connect = objRepeats[prop];

          if (!hexInDomain && connect >= 3) {
            const emptyHex = { id: Number(prop), numDomain: index };

            // Сортируем по количеству связей
            if (connect === 6) {
              checkSixIntersect(emptyHex);
            } else {
              const emptyArea = checkOtherIntersect(emptyHex);
              resAreaInDomains.push(...emptyArea);
            }
          }
        }
        areaInDomain.push(resAreaInDomains);
      });
    }

    // Если связей 6 - то домен недосвязный
    function checkSixIntersect(emptyHex) {
      if (emptyHex) {
        check();
      }

      function check() {
        // Добавляем стартовый элемент в стек
        if (sumEmptyAreasDomains.length === 0) {
          sumEmptyAreasDomains.push(emptyHex);

          //  Проверяем повторы доменов, добавляем если нет
        } else {
          const repeatedDomain = checkRepeatedDomain(emptyHex);

          if (!repeatedDomain) {
            sumEmptyAreasDomains.push(emptyHex);
          }
        }
      }
    }

    //  ОБрабатываем другие хексы со связями меньше 6, получаем связи в пустых зонах
    function checkOtherIntersect(emptyHex) {
      //Хекс пустой области со связями
      let arrResHex = [];

      if (emptyHex) {
        check(emptyHex);
      }

      function check(emptyHex) {
        const objHex = { ...emptyHex };

        //   Номер домена в стеке
        const numDomain = objHex.numDomain;
        const idHex = objHex.id;

        //   Добавляем соседий к элементу
        objHex.group = [...getNeighbors(idHex)];

        //   Хексы не входящие в домен
        const emptyHexInDomain = !domainsLong[numDomain].includes(objHex.id);

        if (emptyHexInDomain) {
          //Отсекаем элементы по краям решетки
          if (objHex.group.length > 4) {
            // Связи внутри свободной области домена
            const connectID = emptyConnect(objHex, numDomain);
            arrResHex.push({
              id: objHex.id,
              numDomain: numDomain,
              group: connectID,
            });
          }
        }
      }
      return arrResHex;
    }

    //  Ищем связи у свободных элементов которые не ограничены элементами домена
    function emptyConnect(objHex, numDomain) {
      //   Все пересчения с доменом
      const intersectDomain = domainsLong[numDomain].filter((id) => {
        return objHex.group.includes(id);
      });

      //   Находим связанные свободные элементы вне домена
      const emptyConnect = objHex.group.filter(
        (id) => !intersectDomain.includes(id)
      );

      return emptyConnect;
    }

    //  Соседи связанных но не в домене элементов
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
    function checkRepeatedDomain(objEmptyHex) {
      return sumEmptyAreasDomains.some((elem) => {
        return elem.numDomain === objEmptyHex.numDomain;
      });
    }

    getHexConnectDomains();
    console.log(areaInDomain);
    console.log(sumEmptyAreasDomains);
    infoTableStore.getSumNonSimplyDomain("-");
  }, [isBtnRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
