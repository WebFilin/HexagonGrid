import React from "react";

import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import hexHandler from "../../store/hexHandler";

const ColorazeDomains = observer(() => {
  const arrDomains = toJS(hexHandler.stackDomains);

  React.useEffect(() => {
    const collectionsHexs = toJS(hexHandler.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      const hexTxt = hexElem.lastChild;
      const id = Number(hex.id);

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      //  hexTxt.textContent = null;
      hex.setAttribute("value", 0);

      arrDomains.forEach((elem) => {
        // Задаем цвета доменов
        if (!elem.hasOwnProperty("colorDomain")) {
          elem.colorDomain = hexHandler.setDomainColor();
        }

        if (elem.idDomain.includes(id)) {
          hex.style.fill = elem.colorDomain;
          hex.style.fillOpacity = 0.8;
          hex.setAttribute("value", 1);
          //   hexTxt.textContent = 1;
        }
      });
    });

    console.log(arrDomains);
  }, [arrDomains]);

  return <div></div>;
});

export default ColorazeDomains;
