import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  name: string;
  quantity: number;
}

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [extraMedicine, setExtraMedicine] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);

        if (Array.isArray(parsed)) {
          const cleaned = parsed.map((item: string) => ({
            name: item
              .replace(/^e\.g\.\s*/i, "")
              .replace(/^,\s*/, ""),
            quantity: 1,
          }));

          setCart(cleaned);
        } else {
          setCart([]);
        }
      } catch {
        setCart([]);
      }
    }
  }, []);

  const updateStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart.map((item) => item.name))
    );
  };

  const removeMedicine = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateStorage(updatedCart);
  };

  const addExtraMedicine = () => {
    if (!extraMedicine.trim()) return;

    const cleaned = extraMedicine
      .trim()
      .replace(/^e\.g\.\s*/i, "")
      .replace(/^,\s*/, "");

    const updatedCart = [...cart, { name: cleaned, quantity: 1 }];
    updateStorage(updatedCart);
    setExtraMedicine("");
  };

  const increaseQty = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateStorage(updatedCart);
  };

  const decreaseQty = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateStorage(updatedCart);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-8 border border-white/40">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            🏥 Medicine Dashboard
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Manage your medicines easily
          </p>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            No medicines added yet 💊
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white/60 p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  {/* LEFT: Name */}
                  <div className="w-1/3 font-semibold text-gray-700 truncate">
                    {item.name}
                  </div>

                  {/* CENTER: Quantity */}
                  <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl shadow-inner">
                    <button
                      onClick={() => decreaseQty(index)}
                      className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-lg font-bold"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* RIGHT: Remove */}
                  <div className="w-1/4 flex justify-end">
                    <button
                      onClick={() => removeMedicine(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-center mb-4">
              Total Medicines:{" "}
              <span className="font-bold text-indigo-600">
                {cart.length}
              </span>
            </div>
          </>
        )}

        {/* Add Medicine */}
        <div className="flex gap-3 mb-6">
          <input
            value={extraMedicine}
            onChange={(e) => setExtraMedicine(e.target.value)}
            placeholder="Add medicine..."
            className="flex-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-300 outline-none"
          />

          <button
            onClick={addExtraMedicine}
            className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl"
          >
            Add
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-xl"
          >
            ← Back
          </button>

          <button
            onClick={() => alert("Order placed successfully! 🎉")}
            disabled={cart.length === 0}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl disabled:opacity-40"
          >
            Confirm 🚀
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderPage;