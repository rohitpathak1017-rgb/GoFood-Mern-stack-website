import { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const { foodItem, options = [] } = props;
 const data = useCart();
 console.log("DATA =>", data);
  const dispatch = useDispatchCart();
 


  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // options = [{ half: "170", full: "300" }]
  const priceObject =
    Array.isArray(options) && options.length > 0 ? options[0] : {};

  const priceOptions = Object.keys(priceObject);

  const handleAddToCart = async () => {
    // Size validation FIRST
    if (!size) {
      alert("Please select size");
      return;
    }

    let existingFood = null;

    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        existingFood = item;
        break;
      }
    }

    if (existingFood) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        size: size,
        qty: qty
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        size: size,
        qty: qty,
        price: priceObject[size] * qty    
      });
    }
  };

  if (!foodItem) return null;

  return (
    <div className="card mt-3 food-card">
      <img
        src={foodItem.img}
        className="card-img-top"
        alt={foodItem.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{foodItem.name}</h5>

        {/* QTY + SIZE + PRICE */}
        <div className="mt-auto d-flex justify-content-between align-items-center gap-2">

          {/* QTY */}
          <select
            className="bg-success rounded text-white w-25"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* SIZE */}
          <select
            className="bg-success rounded text-white"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {priceOptions.map((sizeKey) => (
              <option key={sizeKey} value={sizeKey}>
                {sizeKey.toUpperCase()} - ₹{priceObject[sizeKey]}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <span className="fw-bold">
            ₹ {size ? priceObject[size] * qty : 0}
          </span>
        </div>

        {/* ADD TO CART */}
        <button
          className="btn bg-success text-white mt-2 w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
