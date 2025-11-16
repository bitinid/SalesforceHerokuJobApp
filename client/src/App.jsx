import React, { useState } from "react";
import { submitApplication } from "./api";

export default function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: ""
  });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting application...");
    setStatus("");

    const result = await submitApplication(form);

    if (result.success) {
      setMessage("Application submitted successfully - Good Luck !");
      setStatus("success");

      // CLEAR FORM AFTER SUBMISSION
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        resume: ""
      });
    } else {
      setMessage(result.message || "Error submitting application.");
      setStatus("error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Job Application</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="firstName"
            placeholder="First Name"
            required
            value={form.firstName}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            required
            value={form.lastName}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="resume"
            placeholder="Resume (paste text)"
            value={form.resume}
            onChange={handleChange}
            style={styles.textarea}
          ></textarea>

          <button type="submit" style={styles.button}>
            Submit Application
          </button>
        </form>

        {message && (
          <div
            style={{
              ...styles.message,
              ...(status === "success" ? styles.success : styles.error)
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

//
// Inline Modern Styles
//

const styles = {
  page: {
    background: "#f2f4f8",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#222"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px"
  },

  textarea: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    minHeight: "120px",
    fontSize: "16px"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#0057ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.2s"
  },

  message: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    textAlign: "center"
  },

  success: {
    background: "#d4ffe0",
    color: "#0a5d21"
  },

  error: {
    background: "#ffe0e0",
    color: "#a10000"
  }
};
