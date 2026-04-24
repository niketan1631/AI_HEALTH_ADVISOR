import React, { useState } from "react";

interface Props {
  onClose: () => void;
}

const OrderForm: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleConfirm = () => {
    if (!name || !address || !phone) {
      alert("Please fill all details");
      return;
    }

    setOrderPlaced(true);

    setTimeout(() => {
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-96 shadow-2xl relative overflow-hidden">

        {!orderPlaced ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              📦 Enter Delivery Details
            </h2>

            {/* ✅ NEW NAME FIELD */}
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-indigo-300 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Address"
              className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-indigo-300 outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-indigo-300 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Confirm Order
              </button>
            </div>
          </>
        ) : (
          /* 🎉 SUCCESS + DELIVERY ANIMATION */
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Order Placed!
            </h2>

            <p className="text-gray-600 mb-6">
              Thank you {name}! Your medicines are arriving 🚀
            </p>

            <div className="relative w-full h-16 overflow-hidden">
              <div className="absolute left-[-50px] animate-moveBike text-3xl">
                🛵💊
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 animate-pulse">
              Delivery partner is on the way...
            </p>
          </div>
        )}

      </div>

      {/* 🔥 Animation */}
      <style>
        {`
          @keyframes moveBike {
            0% { left: -50px; }
            100% { left: 100%; }
          }

          .animate-moveBike {
            animation: moveBike 3s linear infinite;
          }
        `}
      </style>

    </div>
  );
};

export default OrderForm;