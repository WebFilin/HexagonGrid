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
    const colorGroup = hexCordinate.randomColor();
    const ratio = 0.5;
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexs = Array.from(elem.children);
      hexs[0].style.fill = null;
      hexs[0].style.fillOpacity = "0.3";
      Math.random() <= ratio ? autoJoin(hexs) : splitDomains(hexs);
    });

    function autoJoin(hexs) {
      hexs[0].style.fillOpacity = "0.8";
      hexs[0].style.fill = colorGroup ;
      // hexs[1].textContent = 0;
      console.log(hexs[0].id);
    }

    function splitDomains(hexs) {
      // hexs[0].style.fill = "green";
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
