import { MdShoppingCart } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import BasketItem from "./BasketItem";

export default function BasketList({
  finishShopping,
  deleteBook,
  type,
  basket,
}) {
  return (
    <div className="basketList">
      {type === "buy" ? (
        <div className="basketList__name">
          <MdShoppingCart className="forSale basketIcon" />
          Buy
        </div>
      ) : (
        <div className="basketList__name">
          <BsHourglassSplit className="forRent basketIcon" />
          Rent
        </div>
      )}
      <div className="basketList__content">
        {basket.map((book) => (
          <BasketItem
            type={type}
            finishShopping={finishShopping}
            key={book.etag}
            book={book}
            deleteBook={deleteBook}
          />
        ))}
        {basket.length ? null : (
          <h3 className="basketList__empty">Empty basket</h3>
        )}
      </div>
    </div>
  );
}
