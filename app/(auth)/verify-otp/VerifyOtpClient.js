'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!email || !otp) {
      alert("Enter email and OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP Verified ✅");

        // redirect to reset-password with token (if using JWT flow)
        router.push(`/reset-password?token=${data.token}`);
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (err) {
      alert("Error occurred");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Verify OTP</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}


