import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../Context/StoreContext";
import "./ProductCard.css";

function ProductCard(props) {
  const { cart, setCart } = useContext(StoreContext);

  const handleAddButton = () => {
    setCart([...cart, props.element]);
  };

  return (
    <div className="cardWrapper">
      <Link to={`/details/${props.productID}`}>
        <p className="cardName">{props.name}</p>
      </Link>
      <div className="cardContent">
        <Link to={`/details/${props.productID}`}>
          <img src={props.image} alt="product" />
        </Link>
        <div className="btnPriceWrap">
          <p>R${props.price.toFixed(2)}</p>
          <button onClick={handleAddButton}>Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
