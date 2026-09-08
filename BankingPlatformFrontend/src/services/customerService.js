const API_URL =
  "https://customerservice-mmah.onrender.com/api/v1/customers/register";

const API_KEY = "my-secret-api-key-12345";

export const registerCustomer = async (customerData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(customerData),
  });

  const data = await response.json();

  // 201 - Customer created
  if (response.status === 201) {
    return {
      success: true,
      status: 201,
      data,
    };
  }

  // 409 - Customer already exists
  if (response.status === 409) {
    return {
      success: false,
      status: 409,
      message: data.message || "Customer already exists",
      data,
    };
  }

  // Other API errors
  return {
    success: false,
    status: response.status,
    message: data.message || "Customer registration failed",
    data,
  };
};