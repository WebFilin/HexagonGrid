import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  // Все отрисованные хексы
  const collectionsHexs = toJS(hexCordinate.svgArea);
  const ratio = 0.5;

  React.useEffect(() => {
    const arrHexs = Array.from(collectionsHexs);
    arrHexs.forEach((elem) => {
      const hexs = Array.from(elem.children);
      Math.random() <= ratio ? splitDomains(hexs) : mergerDomains(hexs);
    });
  }, [collectionsHexs]);

  function splitDomains(hexs) {
    hexs[0].style.fill = "";
    hexs[1].textContent = null;
  }

  function mergerDomains(hexs) {
    hexs[0].style.fillOpacity = "0.8";
    hexs[0].style.fill = "red";
    //  hexs[1].textContent = "1";
    console.log(hexs[0].id);
  }

  function randomColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }

  return <div></div>;
});

export default RandomDomains;
