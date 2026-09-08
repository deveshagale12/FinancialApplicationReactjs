import { useState } from "react";
import { registerCustomer } from "../services/customerService";

function CustomerRegistration({ onBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobileNumber: "",
    customerType: "INDIVIDUAL",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const result = await registerCustomer(formData);

      // 201
      if (result.status === 201) {
        setSuccess(result.data);
        return;
      }

      // 409
      if (result.status === 409) {
        setError({
          type: "CONFLICT",
          message: result.message,
        });
        return;
      }

      // Other errors
      setError({
        type: "ERROR",
        message: result.message,
      });
    } catch (err) {
      setError({
        type: "NETWORK",
        message: "Unable to connect to customer service.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <button
          onClick={onBack}
          className="mb-6 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Customer Registration
        </h1>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-5">
            <h2 className="mb-3 text-lg font-semibold text-green-700">
              Customer Registered Successfully
            </h2>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <p>
                <strong>Customer ID:</strong>{" "}
                {success.customerId}
              </p>

              <p>
                <strong>Customer Number:</strong>{" "}
                {success.customerNumber}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {success.firstName} {success.middleName}{" "}
                {success.lastName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {success.email}
              </p>

              <p>
                <strong>Mobile:</strong>{" "}
                {success.mobileNumber}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {success.status}
              </p>

              <p>
                <strong>Customer Type:</strong>{" "}
                {success.customerType}
              </p>

              <p>
                <strong>Date of Birth:</strong>{" "}
                {success.dateOfBirth}
              </p>
            </div>
          </div>
        )}

        {/* 409 CONFLICT */}
        {error?.type === "CONFLICT" && (
          <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-5">
            <h2 className="mb-2 text-lg font-semibold text-yellow-800">
              Customer Already Exists
            </h2>

            <p className="text-yellow-700">
              {error.message}
            </p>

            <p className="mt-2 text-sm text-yellow-600">
              Please use a different email address.
            </p>
          </div>
        )}

        {/* OTHER ERRORS */}
        {error && error.type !== "CONFLICT" && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-5">
            <h2 className="mb-2 text-lg font-semibold text-red-700">
              Registration Failed
            </h2>

            <p className="text-red-600">
              {error.message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="rounded-lg border p-3"
            />

            <input
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Middle Name"
              className="rounded-lg border p-3"
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="rounded-lg border p-3"
            />
          </div>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="w-full rounded-lg border p-3"
          />

          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="INDIVIDUAL">Individual</option>
            <option value="CORPORATE">Corporate</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register Customer"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CustomerRegistration;