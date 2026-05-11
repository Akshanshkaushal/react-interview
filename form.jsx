import React, { useState } from "react";

function FormValidation() {
  /* ---------------- Form State ---------------- */

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* ---------------- Error State ---------------- */

  const [errors, setErrors] = useState({});

  /* ---------------- Handle Input Change ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- Validation Logic ---------------- */

  const validateForm = () => {
    const newErrors = {};

    // Required Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    // Email Format Validation
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Required Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    // Password Length Validation
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  /* ---------------- Form Submit ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    // If no errors
    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted Successfully");

      console.log(formData);
    }

    // Clear fields
    setFormData({
      email: "",
      password: "",
    });

    // Clear errors
    setErrors({});
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Form Validation</h1>

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          {errors.password && <p style={errorStyle}>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const inputStyle = {
  padding: "10px",
  width: "300px",
};

const errorStyle = {
  color: "red",
  marginTop: "5px",
};

export default FormValidation;
