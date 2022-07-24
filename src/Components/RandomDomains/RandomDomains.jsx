import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;
  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    //  const mainDomains = toJS(hexCordinate.arrDomains);
    //  const peakAndGroup = toJS(hexCordinate.peakAndGroup);
    const colorGroup = hexCordinate.randomColor();
    const ratio = 0.5;
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexs = Array.from(elem.children);
      const hex = hexs[0];
      const hexTxt = hexs[1];
      hex.style = { fill: "", fillOpacity: "0.3" };

      if (Math.random() <= ratio) {
         hexCordinate.getHex(hex);
        autoJoin(hex, hexTxt);
      } else {
        splitDomains(hex, hexTxt);
      }
    });

    function autoJoin(hex, hexTxt) {
      hex.style.fill = "red";
      hex.style.fillOpacity = 0.8;
      //  hexTxt.textContent = 1;
      const peakAndGroup = toJS(hexCordinate.peakAndGroup);

      console.log(peakAndGroup);
    }

    function splitDomains(hex, hexTxt) {
      // hexs[1].textContent = 0;
    }
  }, [isRandom]);

  //   function randomColor() {
  //     return (
  //       "#" +
  //       (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
  //     );
  //   }

  return <div></div>;
});

export default RandomDomains;
