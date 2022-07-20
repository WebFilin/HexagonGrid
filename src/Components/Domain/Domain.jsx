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

      const objDomain = {
        idDomain: colorGroup,
        hexId: [],
        groupCord: [],
      };

      if (mainDomains.length === 0) {
        hexCordinate.createDomen(objDomain);
        hexCordinate.addSubDomain(nodeID, 0, hexID);
      }

      mainDomains.map((domain, index) => {
        const domainNode = domain.groupCord;
        const colorDomain = mainDomains[index].idDomain;

        const intersect = domainNode.includes(hexID);

        if (intersect) {
          hex.style.fill = colorDomain;

          hexCordinate.addSubDomain(nodeID, index, hexID);
        }

      });

      console.log(mainDomains);
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
