import axios from "axios";
import "./App.css";

function App() {

  const handlePayment = async () => {

    try {

      // Backend Order API
      const { data } = await axios.post(
        "http://localhost:5000/create-order",
        {
          amount: 500
        }
      );

      const options = {

        key: "YOUR_RAZORPAY_KEY_ID",

        amount: data.amount,

        currency: data.currency,

        name: "Travel Booking",

        description: "Flight Booking",

        order_id: data.id,

        handler: async function (response) {

          alert("Payment Successful");

          console.log(response);

          await axios.post(
            "http://localhost:5000/verify-payment",
            response
          );
        },

        prefill: {

          name: "Disha",

          email: "disha@gmail.com",

          contact: "9999999999"
        },

        theme: {

          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (err) {

      console.log(err);

      alert("Payment Failed");

    }

  };

  return (

    <div className="container">

      <h1>Travel Booking</h1>

      <h2>Flight Ticket</h2>

      <p>Delhi → Mumbai</p>

      <h3>₹500</h3>

      <button onClick={handlePayment}>
        Pay Now
      </button>

    </div>

  );

}

export default App;