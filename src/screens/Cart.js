import React from 'react';
import { Delete } from '@mui/icons-material';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();


  const handleCheckOut = async () => {
    let  UserEmail = localStorage.getItem("UserEmail");
    let response = await fetch("http://localhost:5000/api/orderdata", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  
        email: UserEmail,
        order_data: data,
        order_date: new Date().toDateString()
      })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      alert("Order placed successfully");
    }

    // console.log("CHECKOUT CLICKED");
    // console.log("LOCAL STORAGE EMAIL:", UserEmail);
    // console.log("CART DATA:", data);

    // Corrected logic: user must be logged in
    if (!UserEmail) {
      alert("Please login first");
      return;
    }else {
      alert("Order failed: " + response.status);
    }
  };

  if (data.length === 0) {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-light">The Cart is Empty!</h3>
      </div>
    );
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container m-auto mt-5 table-responsive text-light">
      <table className="table table-dark table-hover">
        <thead className="fs-4 text-info">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>₹ {food.price}</td>
              <td>
                <Delete
                  color="error"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch({ type: "REMOVE", index })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-warning mt-3">
        Total Price: ₹ {totalPrice}/-
      </h2>

      <button
        className="btn btn-success mt-4 px-4 py-2"
        onClick={handleCheckOut}
      >
        
        Check Out
      </button>
    </div>
  );
}

   



