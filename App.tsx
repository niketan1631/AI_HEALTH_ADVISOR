import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HealthAdvice } from './types';
import { getHealthAdvice } from './services/geminiService';
import Disclaimer from './components/Disclaimer';
import ResultCard from './components/ResultCard';
import DoctorActions from './components/DoctorActions';
import OrderPage from './components/OrderPage';
import "./custom.css";

const App: React.FC = () => {
  const [healthProblem, setHealthProblem] = useState('');
  const [advice, setAdvice] = useState<HealthAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 FIX: ensure welcome ALWAYS shows first
  const [showWelcome, setShowWelcome] = useState(true);

  const navigate = useNavigate();

  // ✅ Welcome screen timer (FIXED)
  useEffect(() => {
    setShowWelcome(true); // force show
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!healthProblem.trim()) {
      setError('Please describe your health problem.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAdvice(null);

    try {
      const result = await getHealthAdvice(healthProblem);
      console.log("AI Result:", result);
      setAdvice(result);
    } catch (err) {
      setError('Error fetching advice. Try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderMedicine = () => {
    if (!advice) {
      alert("No advice available");
      return;
    }

    const medicines =
      advice.medications ||
      (advice as any).medicines ||
      (advice as any).suggestedMedicines ||
      [];

    if (!Array.isArray(medicines) || medicines.length === 0) {
      alert("No medicines found in AI suggestion.");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(medicines));
    navigate("/order");
  };

  // 🌟 Welcome Screen (FIXED DISPLAY)
  return (
    <>
      {showWelcome && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>Welcome to</h1>
            <h2>AI Health Advisor</h2>
            <p>Your Smart Health Assistant</p>
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center p-6 dark-bg">

              <div className="w-full max-w-2xl">

                {/* Header */}
                <header className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-cyan-400">
                    AI Health Advisor
                  </h1>
                  <p className="text-gray-400">
                    Get AI-powered health suggestions instantly
                  </p>
                </header>

                {/* Disclaimer */}
                <div className="card-dark">
                  <Disclaimer />
                </div>

                {/* Form */}
                <main className="card-dark mt-6">
                  <form onSubmit={handleSubmit}>
                    <label className="block text-lg font-semibold mb-2">
                      Describe your health problem
                    </label>

                    <textarea
                      value={healthProblem}
                      onChange={(e) => setHealthProblem(e.target.value)}
                      placeholder="e.g., I have fever and headache..."
                      className="textarea-dark"
                    />

                    <button
                      type="submit"
                      className="btn-primary mt-4 w-full"
                    >
                      {isLoading ? 'Getting Advice...' : 'Get Advice'}
                    </button>
                  </form>
                </main>

                {/* Error */}
                <div className="mt-6">
                  {error && (
                    <div className="error-dark">
                      {error}
                    </div>
                  )}

                  {/* Results */}
                  {advice && (
                    <>
                      <div className="card-dark mt-4">
                        <ResultCard advice={advice} />
                      </div>

                      <div className="card-dark mt-4">
                        <DoctorActions
                          onCallDoctor={() =>
                            (window.location.href = "tel:+919876543210")
                          }
                          onVideoCall={() =>
                            window.open("https://meet.google.com/", "_blank")
                          }
                        />
                      </div>

                      <button
                        onClick={handleOrderMedicine}
                        className="btn-success mt-4 w-full"
                      >
                        Order Suggested Medicine
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>
          }
        />

        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
};

export default App;