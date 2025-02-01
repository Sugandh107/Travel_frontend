import React from "react";
import { Link } from "react-router-dom";

function CardItem({itemImageSrc,itemText,itemLabel}) {
  return (
    <>
      <li className="cards__item">
        <div className="cards__item__link">
          <figure className="cards__item__pic-wrap" data-category={itemLabel}>
            <img className="cards__item__image" src={itemImageSrc} alt={itemLabel} />
          </figure>
          <div className="cards__item__info">
                <h5 className="cards__item__text">
                    {itemText}
                </h5>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;