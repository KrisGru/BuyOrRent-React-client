import { useContext } from "react";
import OneOrder from "../../components/OneOrder";
import { AppContext } from "../../utils/boxOfStates";

export default function Rented() {
  const { dataUser } = useContext(AppContext);
  const { rentedOrders } = dataUser.user;
  return <div className="userContainer">Rented books</div>;
}
