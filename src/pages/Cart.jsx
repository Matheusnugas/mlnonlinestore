/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../Context/StoreContext";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useContext(StoreContext);
  const [cartTotal, setCartTotal] = useState(0);

  const findTotal = () => {
    let total = 0;
    cart.forEach((element) => (total += element.price));
    setCartTotal(total.toFixed(2));
  };

  useEffect(() => {
    findTotal();
  }, [cart]);

  const removeFromCart = (item) => {
    const newArray = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(newArray);
  };

  return (
    <div className="cartContainer">
      <Link to="/">
        <span>Voltar</span>
      </Link>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        cart.map((element, index) => {
          return (
            <div key={index} className="cartItemWrapper">
              <Link to={`/details/${element.id}`}>
                <p>{element.title}</p>
              </Link>
              <div className="cartContentWrap">
                <img src={element.thumbnail} alt="thumbnail" />
                <p>Valor: R$ {element.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(element)}>
                  Tirar do carrinho
                </button>
              </div>
            </div>
          );
        })
      )}
      <h1 className="cartTotal">Total: R${cartTotal}</h1>
    </div>
  );
}

export default Cart;
