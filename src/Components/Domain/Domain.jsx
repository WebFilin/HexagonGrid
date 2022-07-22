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

      // Прозрачность заливки хекса
      hex.style.fillOpacity = "0.8";

      // Ищем пересечения в домене по ID
      const intersectIndex = hexCordinate.checkElemInDomain(hexID);

      // Структура одной группы в стеке
      const objDomain = {
        idDomain: colorGroup,
        hexId: [hexID],
        groupCord: [...nodeID],
      };

      // Если есть добавляем данные в группу c ID
      if (intersectIndex !== -1) {
        const colorDomain = mainDomains[intersectIndex].idDomain;
        hex.style.fill = colorDomain;
        hexCordinate.addSubDomain(nodeID, intersectIndex, hexID);

        //   Если нет создаем новый домен
      } else {
        hexCordinate.createDomen(objDomain);
      }
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
