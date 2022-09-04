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

      arrDomains.forEach((elem, index) => {
        // Задаем цвета доменов
        if (!elem.hasOwnProperty("colorDomain")) {
          const colorDomain = hexHandler.setDomainColor();
          elem.colorDomain = colorDomain;
          hexHandler.getDomainColor(colorDomain);
        }

        if (elem.idDomain.includes(id)) {
          const color = toJS(hexHandler.arrDomainsColor);
          hex.style.fill = color[index];
          hex.style.fillOpacity = 0.8;
          hex.setAttribute("value", 1);
          // hexTxt.textContent = 1;
        }
      });
    });
  }, [arrDomains]);

  return <div></div>;
});

export default ColorazeDomains;
