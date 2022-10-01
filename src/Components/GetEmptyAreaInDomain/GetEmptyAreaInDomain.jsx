import { observer } from "mobx-react-lite";
import React from "react";
import infoTableStore from "../../store/infoTableStore";

const getEmptyAreaInDomain = observer(({ hexConnect }) => {
  React.useEffect(() => {
    // Стек недосвязныx доменов
    const sumEmptyAreasDomains = [];

    hexConnect.forEach((domain) => {
      checkDomains(domain);
    });

    function checkDomains({ hexLink, currDomain, numDomain }) {
      // Проверяем наличие хекса с 6 пересечениями с доменом
      const intersectSix = hexLink.filter(({ link }) => {
        return link === 6;
      });

      if (intersectSix.length !== 0) {
        checkSixIntersect(intersectSix, currDomain, numDomain);
      } else {
        checkOtherIntersect(hexLink, currDomain, numDomain);
      }
    }

    //  Если хекс c 6 пересечениями - сразу пушим в стек
    function checkSixIntersect(intersectSix, currDomain, numDomain) {
      // Проверяем если хекс не в домене
      const outDomain = intersectSix.some((elem) => {
        return !currDomain.includes(elem.id);
      });

      if (outDomain) {
        sumEmptyAreasDomains.push({
          aaa: intersectSix,
          id: [...currDomain],
          numDomain: numDomain,
        });
      }

      console.log("6");
      console.log(sumEmptyAreasDomains);
    }

    //  ОБрабатываем другие хексы со связями меньше 6, получаем связи в пустых зонах
    function checkOtherIntersect(hexLink, currDomain, numDomain) {
      // Получаем пустую область в домене
      const hexLinkDomain = hexLink
        .map(({ id, link, neighbors }) => {
          if (link > 2 && neighbors.length > 4 && !currDomain.includes(id)) {
            return [id, ...neighbors];
          }
        })
        .filter(Boolean)
        .flat();

      //   Свободная область в домене
      const emptyArea = new Set(
        hexLinkDomain.filter((id) => !currDomain.includes(id))
      );

      // Получаем количество соседий и пересечений
      const infoEmptyHexs = [...emptyArea]
        .map((id) => {
          return hexLink.find((elem) => {
            return elem.id === id;
          });
        })
        .filter(Boolean);

      // Проверяем область в домене на границы или открытость
      // Если область выходит в край решетки (<= 4х соседей) и у элементов одна связь с доменом - домен открыт
      const checkBorder = infoEmptyHexs.filter(({ id, link, neighbors }) => {
        if (link === 1 || neighbors.length <= 4) {
          return id;
        }
      });

      // Если домен имеет закрытую область - добавляем в стек
      if (checkBorder.length === 0) {
        sumEmptyAreasDomains.push({
          id: [...currDomain],
          numDomain: numDomain,
        });
      } else {
        return;
      }
    }
    console.log("Другое ");
    console.log(sumEmptyAreasDomains);

    infoTableStore.getSumNonSimplyDomain(sumEmptyAreasDomains.length);
  }, [hexConnect]);

  return <div></div>;
});

export default getEmptyAreaInDomain;