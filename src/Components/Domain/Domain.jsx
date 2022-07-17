import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const Domain = observer(() => {
  const hex = toJS(hexCordinate.hexObj);

  //   let peak = { hexId: Number(hex.id), group: elemCordGrid };

  //  Обработчик первоначального клика
  React.useEffect(() => {
    const peakAndGroup = toJS(hexCordinate.peakAndGroup);
    const domains = toJS(hexCordinate.arrDomains);

    if (hex && peakAndGroup) {
      const colorGroup = (hex.style.fill = randomColor());

      const objDomain = { idDomain: colorGroup, bodyDomain: [peakAndGroup] };

      hexCordinate.createDomen(objDomain);

      checkHex(domains);
    }
  }, [hex]);

  function checkHex(domanGrup) {
    const hexId = Number(hex.id);

   //  Получаем цвет группы
    let color = hexCordinate.arrDomains[0].idDomain;

    domanGrup.map((elem) => {
      const neighbours = elem.bodyDomain[0].group;
      const checkID = neighbours.find((elemID) => elemID.id === hexId);
      if (checkID) {
        hex.style.fill = color;
      }
    });
  }

  function randomColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }

  return <></>;
});

export default Domain;
