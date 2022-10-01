import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import React from "react";
import infoTableStore from "../../store/infoTableStore";
import domainsStore from "../../store/domainsStore";

const getEmptyAreaInDomain = observer(({ hexConnect }) => {
  React.useEffect(() => {
    // Стек недосвязныx доменов
    const sumEmptyAreasDomains = [];

    hexConnect.forEach((domain) => {
      checkDomain(domain);
    });

    function checkDomain({ hexLink, currDomain, numDomain }) {
      // console.log(hexLink);
      // console.log(currDomain);

      // Домен с 6 связями с доменом
      // checkSixIntersect(params)

      //Домен с произвольным количеством связей больше 2х
      checkOtherIntersect(hexLink, currDomain);
    }

    //  Обрабатываем сразу 6 связей с доменом
    function checkSixIntersect(params) {}

    //  ОБрабатываем другие хексы со связями меньше 6, получаем связи в пустых зонах
    function checkOtherIntersect(hexLink, currDomain) {
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
        sumEmptyAreasDomains.push([...emptyArea]);
      } else {
        return;
      }
    }

    console.log(sumEmptyAreasDomains);

    infoTableStore.getSumNonSimplyDomain("-");
  }, [hexConnect]);

  return <div></div>;
});

export default getEmptyAreaInDomain;
