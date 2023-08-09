import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
function App() {
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "1",
          },
        },
      ],
    });
  }
  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    return order;
  }
  function _onError(err) {
    console.log(err);
  }
  return (
    <div className="App">
      <PayPalButton
        createOrder={(data, actions) => _createOrder(data, actions)}
        onApprove={(data, actions) => _onApprove(data, actions)}
        onCancel={() => _onError("Canceled")}
        onError={(err) => _onError(err)}
        style={{ layout: "horizontal", tagline: "false", marginHorizontal: 20 }}
      />
    </div>
  );
}
export default App;
