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

      if (hex) {
        // console.log(hexID)
        // console.log(peakAndGroup.group)
      }

      mainDomains.map((domains) => {
        hex.style.fill = "green";
      //   const groupID = peakAndGroup.group;

      //   const groupNode = domains.groupCord;

        hexCordinate.addSubDomain(peakAndGroup);

        //   Находим группу координат домена
        //   console.log(groupNode);

        // Группа кординат хекса
        //   console.log(groupID);
      });
    }

    function checkIdInGroup(hexID) {
      // console.log(hexID);

      mainDomains.map((elem) => {
        const groupHex = elem.groupCord;
        const colorDomain = elem.idDomain;

        //   console.log(elem);

        if (groupHex.includes(hexID)) {
          console.log("В группе");
          hex.style.fill = `${colorDomain}`;

          hexCordinate.addSubDomain(peakAndGroup);

          //  console.log("Стейт доменов");
          //  console.log(mainDomains[0].groupCord);
        } else {
          console.log("Нужно создать новый домен");
        }
      });
    }

    function createDomen(index) {
      const colorGroup = (hex.style.fill = randomColor());
      const objDomain = {
        idDomain: colorGroup,
        hexId: [],
        groupCord: [],
      };
      hexCordinate.createDomen(objDomain);
      hexCordinate.addSubDomain(peakAndGroup);
    }

    //  console.log(mainDomains);
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
