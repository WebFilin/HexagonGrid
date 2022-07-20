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
      const objDomain = {
        idDomain: colorGroup,
        hexId: [],
        groupCord: [],
      };

      const hexID = Number(hex.id);

      mainDomains.map((domain, index) => {
        const domainNode = domain.groupCord;
        const nodeID = peakAndGroup.group;

        const intersect = domainNode.includes(hexID);

        if (intersect) {
          hexCordinate.addSubDomain(nodeID, index, hexID );
          console.log("Найден домен " + index);
        } else {
          console.log("Нужно создать домен");
        }

        // console.log(intersect)

        console.log(domain);
      });
    }

    function createDomen(index) {
      // const colorGroup = (hex.style.fill = randomColor());
      // const objDomain = {
      //   idDomain: colorGroup,
      //   hexId: [],
      //   groupCord: [],
      // };
      // hexCordinate.createDomen(objDomain);
      // hexCordinate.addSubDomain(peakAndGroup);
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
