import { useContext } from "react";
import { AppContext } from "../utils/boxOfStates";
import BasketList from "../components/basket/BasketList";

export default function Basket() {
  const { basketBuy, setBasketBuy, setBasketRent, basketRent, user, setUser } =
    useContext(AppContext);

  function totalPrice() {
    let pricesArray = [];
    basketBuy.map((book) =>
      pricesArray.push(
        book.saleInfo.listPrice.amount ? book.saleInfo.listPrice.amount : null
      )
    );
    let amountBook = pricesArray.length;
    let totalPrice = 0;
    for (let i = 0; i < amountBook; i++) {
      totalPrice += pricesArray[i];
    }
    return totalPrice.toFixed(2);
  }

  function deleteBook(id, type) {
    if (type === "buy") {
      if (id === undefined) {
        setBasketBuy([]);
      } else {
        let cancelbook = basketBuy.filter((book) => {
          return book.id !== id;
        });
        setBasketBuy(cancelbook);
      }
    } else {
      if (id === undefined) {
        setBasketRent([]);
      } else {
        let cancelBook = basketRent.filter(function (book) {
          return book.id !== id;
        });
        setBasketRent(cancelBook);
      }
    }
  }

  function finishShopping(order, type) {
    if (user.logged) {
      const { email, login, password, finished_rent, finished_buy } = user.user;
      let orderBuy = finished_buy;
      let orderRent = finished_rent;
      if (type === "buy") {
        orderBuy.push({ order });
        deleteBook(order.id, type);
      } else {
        orderRent.push({ order });
        deleteBook(order.id, type);
      }
      setUser({
        user: {
          email,
          login,
          password,
          finished_rent: orderRent,
          finished_buy: orderBuy,
        },
        logged: true,
      });
    } else alert(" first log in");
  }

  return (
    <>
      <h1 className="headerBasket">Basket</h1>
      <BasketList
        basket={basketBuy}
        finishShopping={finishShopping}
        deleteBook={deleteBook}
        type="buy"
      />
      <div className="total">
        <div className="totalPrice">
          Total: <span>{totalPrice()} PLN</span>
        </div>
        <button
          className="btnBasket"
          onClick={() => finishShopping(basketBuy, "buy")}
        >
          Buy All
        </button>
      </div>

      <div className="line-betweenBasketLists"></div>
      <BasketList
        finishShopping={finishShopping}
        basket={basketRent}
        type="rent"
        deleteBook={deleteBook}
      />
      <div className="total">
        <div className="totalRentBooks">
          Total: <span>{basketRent.length} books</span>
        </div>
        <button
          className="btnBasket"
          onClick={() => finishShopping(basketRent, "rent")}
        >
          Rent All
        </button>
      </div>
    </>
  );
}
