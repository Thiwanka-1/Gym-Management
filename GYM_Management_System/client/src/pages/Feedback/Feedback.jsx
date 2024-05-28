import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cat from "./dfdfdf.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    const nameRegex = /^[a-zA-Z\s]+$/; // Regex to match only letters and spaces
    if (!nameRegex.test(formData.name)) {
      return setErrorMessage("Name should only contain letters and spaces.");
    }

    // Basic validation
    if (!formData.Email || !formData.type || !formData.descrp) {
      return setErrorMessage("Please fill in all fields.");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      return setErrorMessage("Please enter a valid email address.");
    }

    try {
      const feedback = {
        ...formData,
        CurrentuseId: currentUser._id,
      };

      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/Fcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        alert("successful");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const typeOptions = ["Doctor", "Trainer", "About Gym", "Other"];

  return (
    <div>
      <div className="h-[700px] relative">
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
          <div className="w-[490px] mt-[-40px] h-[650px] bg-white rounded-3xl">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <h1 className="text-2xl mt-2 mb-2 ml-44 font-serif">
                  FeedBack
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">
                      Enter your name
                    </h3>
                    <input
                      className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                      type="text"
                      placeholder="Name"
                      id="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
                    <input
                      className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                      type="email"
                      placeholder="name@company.com"
                      id="Email"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">Type</h3>
                    <select
                      className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                      id="type"
                      onChange={handleChange}
                    >
                      <option value="">Select a type</option>
                      {typeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <h3 className="font-semibold text-slate-400 ml-1">
                      Feedback
                    </h3>
                    <textarea
                      className="bg-slate-100 p-3 rounded-lg w-[460px] h-40"
                      type="text"
                      placeholder="descrp"
                      id="descrp"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="bg-yellow-300 text-black shadow-md shadow-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <Link to="/Feedpage">
                    <button
                      className="bg-yellow-300 text-black shadow-md shadow-black p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                      type="submit"
                    >
                      All Feedback
                    </button>
                  </Link>
                </form>
                {errorMessage && (
                  <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}