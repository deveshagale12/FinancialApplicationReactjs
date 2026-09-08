const API_URL =
    "https://customerservice-mmah.onrender.com/api/v1/customers/register";

const API_KEY =
    "my-secret-api-key-12345";

export const registerCustomer = async (customerData) => {

    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },

        body: JSON.stringify(customerData),
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            data?.error ||
            `Registration failed: ${response.status}`
        );
    }

    return data;
};