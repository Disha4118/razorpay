import axios from "axios";
import "./App.css";

function App() {

  const handlePayment = async () => {

    try {

      const { data } = await axios.post(
        "http://localhost:5000/create-order",
        {
          amount: 1
        }
      );

      const options = {

        key: "rzp_test_TAUsqvUM7ujCDi",

        amount: data.amount,

        currency: data.currency,

        name: "CodeMaster Academy",

        description: "React Masterclass",

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

          color: "#4F46E5"

        }

      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    }

    catch (err) {

      console.log(err);

      alert("Payment Failed");

    }

  };

  return (

    <div className="container">

      <h1>🎓 CodeMaster Academy</h1>

      <h2>React Masterclass</h2>

      <p>Become a Full Stack Developer with 20+ hours of content.</p>

      <h3>₹1</h3>

      <button onClick={handlePayment}>
        Buy Course
      </button>

    </div>

  );

}

export default App;