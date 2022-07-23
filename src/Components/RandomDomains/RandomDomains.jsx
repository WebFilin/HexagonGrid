import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  // Все отрисованные хексы
  const collectionsHexs = toJS(hexCordinate.svgArea);

  React.useEffect(() => {
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexs = Array.from(elem.children);

      hexs.forEach((poligon) => {
        //   poligon.style.fill = "red";
      });

      // console.log(hexs);
    });

    //  console.log(arrHexs);
  }, [collectionsHexs]);

  const min = 0.01;
  const max = 0.99 * 10;

  const randomizer = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  console.log(randomizer(min, max));

  return <div></div>;
});

export default RandomDomains;
