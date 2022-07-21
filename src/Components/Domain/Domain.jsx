import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
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
        hexId: [hexID],
        groupCord: [...nodeID],
      };

      console.log(objDomain);

      // Стартовая запись обьекта в стек групп
      if (mainDomains.length === 0) {
        hexCordinate.createDomen(objDomain);
      }

      // Ищем пересечения
      const intersectIndex = mainDomains.findIndex((domain) => {
        return domain.groupCord.includes(hexID);
      });

      console.log(intersectIndex);

      // Если есть добавляем данные в группу c ID
      if (intersectIndex !== -1) {
        const colorDomain = mainDomains[intersectIndex].idDomain;
        hex.style.fill = colorDomain;
        hexCordinate.addSubDomain(nodeID, intersectIndex, hexID);

        console.log("найдено пересечение");

        //   Если нет создаем новый домен
      } else {
        //   hexCordinate.creatDomen(objDomain);
        hexCordinate.createDomen(objDomain);
      }
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
