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
      const hexID = Number(hex.id);

      // Первоначальный вызов
      if (mainDomains.length === 0) {
        createDomen();
      } else {
        checkIdInGroup(hexID);
      }
    }

    function checkIdInGroup(hexID) {
      // console.log(hexID);

      mainDomains.map((elem, index) => {
        const groupHex = elem.groupCord;
        const colorDomain = elem.idDomain;

        if (groupHex.includes(hexID)) {
          console.log("В группе");
          hex.style.fill = `${colorDomain}`;

          hexCordinate.addSubDomain(peakAndGroup,index);

         //  console.log("Стейт доменов");
         //  console.log(mainDomains[0].groupCord);
        } else {
          //  createDomen();
          console.log("Нужно создать новый домен");
        }
      });
    }

// console.log(mainDomains)

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
