import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  // Все отрисованные хексы
  const collectionsHexs = toJS(hexCordinate.svgArea);

  React.useEffect(() => {
    const arrHexs = Array.from(collectionsHexs);
    const ratio = 0.5;

    arrHexs.forEach((elem) => {
      elem.style.fillOpacity = "0.8";
      const hexs = Array.from(elem.children);

      console.log( hexs[1])

      Math.random() <= ratio
        ? (hexs[0].style.fill = "")
        : (hexs[0].style.fill = "red");
    });
  }, [collectionsHexs]);

  function randomColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }

  return <div></div>;
});

export default RandomDomains;
