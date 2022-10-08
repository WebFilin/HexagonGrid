import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import domainsStore from "../../store/DomainsStore";

const ColorazeDomains = observer(() => {
  const arrDomains = toJS(domainsStore.stackDomains);

  React.useEffect(() => {
    const collectionsHexs = toJS(domainsStore.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      const hexTxt = hexElem.lastChild;
      const id = Number(hex.id);

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      // hexTxt.textContent = null;
      hex.setAttribute("value", 0);

      arrDomains.forEach((elem, index) => {
        // Задаем цвета доменов
        if (!elem.hasOwnProperty("colorDomain")) {
          const getColor = setDomainColor();
          elem.colorDomain = getColor;
          domainsStore.getDomainColor(getColor);
        }

        if (elem.includes(id)) {
          const color = toJS(domainsStore.arrDomainsColor);
          hex.style.fill = color[index];
          hex.style.fillOpacity = 0.8;
          hex.setAttribute("value", 1);
          //  hexTxt.textContent = 1;
        }
      });
    });

    function setDomainColor() {
      return (
        "#" +
        (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
      );
    }

  }, [arrDomains]);

  return <></>;
});

export default ColorazeDomains;
