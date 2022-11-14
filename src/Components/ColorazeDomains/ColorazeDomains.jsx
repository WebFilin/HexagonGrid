import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import DomainsStore from "../../store/DomainsStore";

const ColorazeDomains = observer(() => {
  const arrDomains = toJS(DomainsStore.stackDomains);

  React.useEffect(() => {
    const collectionsHexs = toJS(DomainsStore.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      const hexTxt = hexElem.lastChild;
      const id = Number(hex.id);

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      hexTxt.textContent = null;
      hex.setAttribute("value", 0);

      arrDomains.forEach((elem, index) => {
        // Задаем цвета доменов
        if (!elem.hasOwnProperty("colorDomain")) {
          const getColor = DomainsStore.setColor();
          elem.colorDomain = getColor;
          DomainsStore.getDomainColor(getColor);
        }

        if (elem.includes(id)) {
          const color = toJS(DomainsStore.arrDomainsColor);
          hex.style.fill = color[index];
          hex.style.fillOpacity = 0.8;
          hex.setAttribute("value", 1);
          hexTxt.textContent = 1;
        }
      });
    });
  }, [arrDomains]);

  return <></>;
});

export default ColorazeDomains;
