import { useState } from "react";
import { registerCustomer } from "../services/customerService";

const initialForm = {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobileNumber: "",
    customerType: "INDIVIDUAL",
};

function CustomerRegistration({ onBack }) {

    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {

            const response = await registerCustomer(formData);

            console.log("Registration response:", response);

            setSuccessMessage(
                response?.message ||
                "Customer registered successfully!"
            );

            setFormData(initialForm);

        } catch (error) {

            console.error("Registration error:", error);

            setErrorMessage(
                error.message ||
                "Customer registration failed."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-10">

            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">

                    <button
                        onClick={onBack}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        ← Back
                    </button>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Customer Registration
                    </h1>

                    <div className="w-10"></div>

                </div>

                {/* Form Card */}
                <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">

                    {/* Success */}
                    {successMessage && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            ✓ {successMessage}
                        </div>
                    )}

                    {/* Error */}
                    {errorMessage && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            ⚠ {errorMessage}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Name */}
                        <div>

                            <h2 className="mb-4 text-lg font-semibold text-slate-800">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        First Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Diksha"
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Middle Name
                                    </label>

                                    <input
                                        type="text"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                        placeholder="Narayan"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Last Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Kulkarni"
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                            </div>

                        </div>

                        {/* DOB + Gender */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Date of Birth *
                                </label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Gender *
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="MALE">
                                        Male
                                    </option>

                                    <option value="FEMALE">
                                        Female
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>
                                </select>
                            </div>

                        </div>

                        {/* Contact */}
                        <div>

                            <h2 className="mb-4 text-lg font-semibold text-slate-800">
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Email *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="customer@example.com"
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Mobile Number *
                                    </label>

                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="+919876540004"
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                            </div>

                        </div>

                        {/* Customer Type */}
                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Customer Type *
                            </label>

                            <select
                                name="customerType"
                                value={formData.customerType}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="INDIVIDUAL">
                                    Individual
                                </option>

                                <option value="BUSINESS">
                                    Business
                                </option>
                            </select>

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t pt-6">

                            <button
                                type="button"
                                onClick={() => setFormData(initialForm)}
                                disabled={loading}
                                className="rounded-lg border border-slate-300 px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {loading
                                    ? "Registering..."
                                    : "Register Customer"
                                }
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CustomerRegistration;