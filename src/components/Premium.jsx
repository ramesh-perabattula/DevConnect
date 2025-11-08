import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [membershipType, setMembershipType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
        setMembershipType(res.data.membershipType || "");
      }
    } catch (err) {
      console.error("Error verifying premium status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevConnect",
        description: `Premium ${type.charAt(0).toUpperCase() + type.slice(1)} Membership`,
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: type === "gold" ? "#F59E0B" : "#6B7280",
        },
        handler: () => {
          verifyPremiumUser();
        },
        modal: {
          ondismiss: function () {
            console.log("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating payment:", err);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="badge badge-warning badge-lg p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">You're Already a Premium Member!</h1>
              <p className="text-xl text-base-content/70 mb-2">
                Membership Type: <span className="font-semibold capitalize">{membershipType}</span>
              </p>
              <p className="text-base-content/60">
                Thank you for being a valued member of DevConnect
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const plans = [
    {
      name: "Silver",
      type: "silver",
      price: 300,
      duration: "3 months",
      features: [
        "Chat with other developers",
        "100 connection requests per day",
        "Premium badge & blue tick",
        "Priority support",
        "Enhanced profile visibility",
      ],
      popular: false,
      color: "secondary",
    },
    {
      name: "Gold",
      type: "gold",
      price: 700,
      duration: "6 months",
      features: [
        "Chat with other developers",
        "Unlimited connection requests",
        "Premium badge & blue tick",
        "Priority support",
        "Enhanced profile visibility",
        "Early access to new features",
      ],
      popular: true,
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Unlock exclusive features and connect with more developers. Choose the plan that works best for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.type}
              className={`card bg-base-100 shadow-xl relative ${
                plan.popular ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="badge badge-primary badge-lg px-4 py-3">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="card-body p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">{plan.name} Membership</h2>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-5xl font-bold">₹{plan.price}</span>
                    <span className="text-base-content/60">/{plan.duration}</span>
                  </div>
                  <p className="text-sm text-base-content/60">
                    {plan.type === "silver" ? "₹100/month" : "₹117/month"}
                  </p>
                </div>

                <div className="divider"></div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-success flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-base-content/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBuyClick(plan.type)}
                  className={`btn btn-lg w-full ${
                    plan.color === "primary" ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Get {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Premium?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited Connections</h3>
                <p className="text-base-content/70">
                  Connect with as many developers as you want without limits
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Badge</h3>
                <p className="text-base-content/70">
                  Stand out with a verified badge and blue tick on your profile
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
                <p className="text-base-content/70">
                  Get faster response times and dedicated support for all your queries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-base-content/60 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure payment powered by Razorpay. Your payment information is safe and encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
