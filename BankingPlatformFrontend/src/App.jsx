import { useState } from "react";
import "./App.css";
import CustomerRegistration from "./components/CustomerRegistration";

function App() {
    const [showRegistration, setShowRegistration] = useState(false);

    return (
        <div className="app">
            {!showRegistration ? (
                <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
                    <div className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-xl">

                        <h1 className="text-3xl font-bold text-slate-900">
                            Banking Platform
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Welcome to the Banking Platform
                        </p>

                        <button
                            onClick={() => setShowRegistration(true)}
                            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Customer Registration
                        </button>

                    </div>
                </div>
            ) : (
                <CustomerRegistration
                    onBack={() => setShowRegistration(false)}
                />
            )}
        </div>
    );
}

export default App;