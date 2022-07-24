import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;
  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const mainDomains = toJS(hexCordinate.arrDomains);
    const peakAndGroup = toJS(hexCordinate.peakAndGroup);
    const colorGroup = randomColor();
    const ratio = 0.5;
    const arrHexs = Array.from(collectionsHexs);

    console.log(isRandom);

    arrHexs.forEach((elem) => {
      const hexs = Array.from(elem.children);
      Math.random() <= ratio ? splitDomains(hexs) : mergerDomains(hexs);
    });

    function splitDomains(hexs) {
      // hexs[0].style.fillOpacity = "0.3";
      // hexs[0].style.fill = "";
      // hexs[1].textContent = 0;

      console.log(hexs)
    }

    function mergerDomains(hexs) {
      // const hex = hexs[0];
      // const hexID = Number(hex.id);
      // Ищем пересечения
      // hexCordinate.getHex(hex);
      // Получаем группы пересечений
      const nodeID = peakAndGroup.group;

      if (nodeID) {
        // Структура одной группы в стеке
      //   const objDomain = {
      //     idDomain: colorGroup,
      //     hexId: [hexID],
      //     groupCord: [...nodeID],
      //   };

        //   console.log(objDomain);

      //   hexs[0].style.fillOpacity = "0.8";
      //   hexs[0].style.fill = "red";
        //   hexs[1].textContent = 1;
      }
    }
  }, [isRandom]);

  function randomColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }

  return <div></div>;
});

export default RandomDomains;
