import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
import GetInfoRowForTable from "../GetInfoRowForTable/GetInfoRowForTable";
import NotSimplyConnectDomain from "../NotSimplyConnectDomain/NotSimplyConnectDomain";
const RandomDomains = observer(() => {
  // Кнопка авто
  const isBtnRandom = domainsStore.isBtnRandom;

  // Тригер для статистики - количество рандомных элементов
  const sumRandomID = infoTableStore.sumRandomID;

  //   Генерируем домены
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(domainsStore.randomRatio);

    // Стек элементов
    const randomElem = [];

    //   Массив соседий хексов
    const arrNeighbors = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(domainsStore.arrCoordinates);

    //  ! Тестовое убрать
    randomElem.push(
      arrCordMainHex[8],
      arrCordMainHex[9],
      arrCordMainHex[10],
      arrCordMainHex[11],
      arrCordMainHex[16],
      arrCordMainHex[25],
      arrCordMainHex[34],
      arrCordMainHex[35],
      arrCordMainHex[36],
      arrCordMainHex[28],
      arrCordMainHex[19],

      // Второй домен
      arrCordMainHex[13],
      arrCordMainHex[21],
      arrCordMainHex[30],
      arrCordMainHex[39],
      arrCordMainHex[32],
      arrCordMainHex[23],
      arrCordMainHex[14],
      arrCordMainHex[41],
      arrCordMainHex[48],
      arrCordMainHex[56]
    );

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        randomElem.push(hexElem);
      }
    });

    randomElem.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = domainsStore.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNeighbors.push({ id: elemHex.id, group: [...getNeighbors] });
    });

    domainsStore.getVertexLinks(arrNeighbors);
    infoTableStore.getSumRandomId(arrNeighbors.length);
  }, [isBtnRandom]);

  return (
    <>
      {sumRandomID > 0 ? <NotSimplyConnectDomain /> : null}
      <GetInfoRowForTable />
    </>
  );
});

export default RandomDomains;
