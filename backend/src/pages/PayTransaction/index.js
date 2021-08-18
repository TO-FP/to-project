import axios from "axios";
import React, { useState, useEffect } from "react";

const PayTransaction = () => {
  const [payTransaction, setPayTransaction] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    let thisStatus;
    status ? (thisStatus = true) : (thisStatus = false);

    const data = await axios
      .put(
        `${API_URL}/api/change-status-order/${payTransaction}/${status}`,
        null
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  return (
    <div className="container mb-3">
      <input
        type="text"
        name="payTrx"
        placeholder="pay transaction number"
        className="form-control"
        onChange={(e) => setPayTransaction(e.target.value)}
      />

      <select
        name="status"
        className="form-control"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="" disabled>
          status
        </option>
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>

      <button
        className="form-control"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default PayTransaction;
