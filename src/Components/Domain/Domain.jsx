import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS, values } from "mobx";
import { observer } from "mobx-react-lite";

const Domain = observer(() => {
  const hex = toJS(hexCordinate.hexObj);

  //  Обработчик первоначального клика
  React.useEffect(() => {
    const peakAndGroup = toJS(hexCordinate.peakAndGroup);
    const mainDomains = toJS(hexCordinate.arrDomains);

    if (hex) {
      const colorGroup = (hex.style.fill = randomColor());
      const nodeID = peakAndGroup.group;
      const hexID = Number(hex.id);

      // Структура одной группы в стеке
      const objDomain = {
        idDomain: colorGroup,
        hexId: [],
        groupCord: [],
      };

      // Стартовая запись обьекта в стек групп
      if (mainDomains.length === 0) {
        hexCordinate.createDomen(objDomain);
        hexCordinate.addSubDomain(nodeID, 0, hexID);
      }

      const intersectIndex = mainDomains.findIndex((domain) => {
        return domain.groupCord.includes(hexID);
      });

      if (intersectIndex !== -1) {
        console.log("Добавить данные в существующий");
        console.log(intersectIndex);
        const colorDomain = mainDomains[intersectIndex].idDomain;
        hex.style.fill = colorDomain;
        hexCordinate.addSubDomain(nodeID, intersectIndex, hexID);
      } else {
        console.log("Создать домен");
      }

      // Проходимся по общему стеку групп
      // mainDomains.forEach((domain, index) => {
      //   const domainNode = domain.groupCord;
      //   const colorDomain = mainDomains[index].idDomain;

      //   //  Сортируем на наличие пересечений ID элемента клика
      //   const intersect = domainNode.includes(hexID);

      //   //   Есть включение добавляем ID, и окружающие узлы в группу по индексу  в стеке групп
      //   if (intersect) {
      //     //  console.log("Найдено пересечение " + index);
      //     hex.style.fill = colorDomain;
      //     hexCordinate.addSubDomain(nodeID, index, hexID);

      //     //  Нету создаем новую запись в общем стейте набиваем ее значениями
      //   } else {
      //     console.log(intersect);
      //     //  console.log("НЕТ ПЕРЕСЕЧЕНИЯ НОВЫЙ ДОМЕН " + index);
      //     hexCordinate.createDomen(objDomain);
      //     hexCordinate.addSubDomain(nodeID, index, hexID);
      //   }
      // });

      console.log(mainDomains);
    }
  }, [hex]);

  function randomColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }

  return <></>;
});

export default Domain;
