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

    if (hex && peakAndGroup) {
      // Первоначальный вызов
      if (mainDomains.length > 0) {
        //   checkHex(mainDomains);
        createDomen();
      } else {
        createDomen();
      }

      console.log(peakAndGroup);
    }

    function createDomen() {
      const colorGroup = (hex.style.fill = randomColor());
      const objDomain = {
        idDomain: colorGroup,
        hexId: [],
        groupCord: [],
      };
      hexCordinate.createDomen(objDomain);
      hexCordinate.addSubDomain(peakAndGroup);
    }

    console.log(mainDomains);

    function checkHex(arrDomains) {
      const hexId = Number(hex.id);
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
