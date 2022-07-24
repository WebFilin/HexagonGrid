import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;

  const peakAndGroup = toJS(hexCordinate.peakAndGroup);
  const colorGroup = hexCordinate.randomColor();
  const ratio = 0.5;

  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);
    arrHexs.forEach((elem) => {
      const hexs = Array.from(elem.children);
      const hex = hexs[0];
      const hexTxt = hexs[1];
      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      // hexTxt.textContent = 0;

      if (Math.random() <= ratio) {
        checkHex(hex, hexTxt);
      }
    });
  }, [isRandom]);

  function checkHex(hex, hexTxt) {
    hex.style.fillOpacity = "0.8";
    hex.style.fill = colorGroup;
    //   hexTxt.textContent = 1;
    hexCordinate.getHexAutoCheckObj(hex);
  }

  return <div></div>;
});

export default RandomDomains;
