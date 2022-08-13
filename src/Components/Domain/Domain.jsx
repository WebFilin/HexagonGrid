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
    const colorGroup = hexCordinate.randomColor();

    if (hex) {
      const hexID = Number(hex.id);
      const valueHex = Number(hex.getAttribute("value"));
      const relationships = peakAndGroup.group;
      hex.style.fillOpacity = 0.8;
      hex.style.fill = colorGroup;

      // Ищем пересечения в домене по ID
      const intersectIndex = hexCordinate.checkElemInDomain(hexID);

      // Структура одной группы в стеке доменов
      const objDomain = {
        idDomain: colorGroup,
        groupCord: [...relationships],
      };

      function checkDomain(intersectIndex) {
        // Если есть пересечение добавляем данные в группу c ID
        if (intersectIndex !== -1) {
          const colorDomain = mainDomains[intersectIndex].idDomain;
          hex.style.fill = colorDomain;
          hexCordinate.addSubDomain(relationships, intersectIndex);
        }
        //   Если нет создаем новый домен
        else {
          hexCordinate.createDomen(objDomain);
        }
      }

      // Удаляем элемент из группы при повторном клике
      function removeHex() {
        hex.style.fill = "";
        hex.style.fillOpacity = 0.3;

        mainDomains.forEach((elem, index) => {
          const hexInNode = elem.groupCord.includes(hexID);

          if (hexInNode) {
            const indexArrCord = elem.groupCord.findIndex((id) => {
              return id === hexID;
            });

            const indexArrHexId = elem.hexsID.findIndex((id) => {
              return id === hexID;
            });

            hexCordinate.removeHexFromDomain(
              index,
              indexArrCord,
              indexArrHexId
            );
          }
        });
      }
      // Если элемент кликнут в первый раз
      // valueHex === 1 ? checkDomain(intersectIndex) : removeHex();

      checkDomain(intersectIndex);
    }
  }, [hex]);

  return <></>;
});

export default Domain;
