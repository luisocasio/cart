import { useEffect, useState } from "react";
import data from "../data.json";

function Cart({ item, price }) {
  let qty = item.length;

  return (
    <div>
      <h1>Cart Qty</h1>
      <p>{qty}</p>

      <div>
        <h3>Cart Details</h3>
      </div>
      <div>
        {item.length >= 1 ? (
          item.map((item, index) => (
            <div
              key={(item, index)}
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <p style={{ width: "100%", textAlign: "center" }}>{item.name}</p>
              <p style={{ width: "100%", textAlign: "center" }}>
                {item.description}
              </p>
              <p style={{ width: "100%", textAlign: "center" }}>{item.cost}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty...</p>
        )}
        <p>Total: ${`${price}`}</p>
      </div>
    </div>
  );
}

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState([]);
  const [price, setPrice] = useState(0.0);

  function sortByName() {
    let names = list.items.map((item) => item);
    let sortedNames = names.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    console.log("Listed items: ", list.items);

    // This is the array I want to render
    console.log("Sorted items: ", sortedNames);
    // This works once visually but buttons need to be re-mapped
    // setList((prev) => (prev.items = [...sortedNames]));
  }

  const addToCart = (e) => {
    if (e.target.value) {
      let itemSelected = list.items[e.target.value];
      setItem(() => [item.push(itemSelected)]);
      setItem(() => [...item]);

      setPrice(Math.round(Number(itemSelected.cost)) + price);
    }
  };

  useEffect(() => {
    setList(data);
  }, []);

  return (
    <div className="App">
      <h1>Items</h1>

      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "25%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button
            style={{
              borderRadius: "5px",
              cursor: "pointer",
              border: "1px solid #000",
            }}
            onClick={sortByName}
          >
            sort by name
          </button>
          <button
            style={{
              borderRadius: "5px",
              cursor: "pointer",
              border: "1px solid #000",
            }}
          >
            sort by cost
          </button>
        </div>
      </div>
      {data.items.map((item, index) => {
        return (
          <ul
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <li style={{ listStyle: "none", width: "100%" }}>{item.name}</li>
              <li style={{ listStyle: "none", width: "100%" }}>
                {item.description}
              </li>
              <li style={{ listStyle: "none", width: "100%" }}>{item.cost}</li>
              <button
                style={{
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "1px solid #000",
                  width: "300px",
                }}
                onClick={addToCart}
                value={index}
              >
                Add to Cart
              </button>
            </div>
          </ul>
        );
      })}

      <Cart item={item} price={price} />
    </div>
  );
}

export default App;
