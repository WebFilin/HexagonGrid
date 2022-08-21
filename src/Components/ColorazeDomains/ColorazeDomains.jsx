import React from "react";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import hexCordinate from "../../state/hexCordinate";

const ColorazeDomains = observer(() => {
  const collectionsHexs = toJS(hexCordinate.svgArea);
  const arrHexs = Array.from(collectionsHexs);

  const arrDomains = toJS(hexCordinate.stackDomains);

  arrHexs.forEach((hexElem) => {
    const hex = hexElem.firstChild;
    const hexTxt = hexElem.lastChild;
    const id = Number(hex.id);

    // Сброс стилей хексов
    hex.style = { fill: null, fillOpacity: 0.3 };
    //  hexTxt.textContent = null;

    arrDomains.forEach((elem) => {
      if (elem.idDomain.includes(id)) {
        hex.style.fill = elem.colorDomain;
        hex.style.fillOpacity = 0.8;
        hex.setAttribute("value", 1);
        //   hexTxt.textContent = 1;
      }
    });
  });

  return <div></div>;
});

export default ColorazeDomains;
