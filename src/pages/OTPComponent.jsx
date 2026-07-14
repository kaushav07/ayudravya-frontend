
import React, { useRef, useState } from "react";

const OTPComponent = ({
  length = 6,
  title = "Verify Your Email",
  subtitle = "Enter the code we've sent to your email",
  resendText = "Didn't get the code?",
  buttonText = "Verify OTP",
  onSubmit,
  onResend,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit number
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");

    if (!pastedData.every((char) => /^[0-9]$/.test(char))) return;

    const newOtp = Array(length).fill("");

    pastedData.forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtp(newOtp);

    const focusIndex =
      pastedData.length >= length ? length - 1 : pastedData.length;

    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== length) {
      alert(`Please enter ${length} digit OTP`);
      return;
    }

    if (onSubmit) {
      onSubmit(finalOtp);
    } else {
      console.log("OTP:", finalOtp);
    }
  };

  return (
    <div className="flex min-h-150 items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-[#fff] p-8 ">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2C4A3E] text-2xl font-black text-white">
            AD
          </div>

          <h2 className="mt-6 text-3xl font-black text-stone-900">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            {subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-center gap-3 z-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="md:h-14 md:w-12 h-10 w-10 rounded-xl border border-emerald-200 bg-emerald-50/40 text-center text-2xl 
                font-bold text-stone-900 outline-none transition-all focus:border-[#2C4A3E] focus:ring-4 focus:ring-emerald-100 sm:h-16 sm:w-14"
              />
            ))}
          </div>

          <button
            type="submit"
            className="p-2 bg-[#2C4A3E] border text-white w-full mt-2"
                    >
            {buttonText}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-stone-500">
          {resendText}{" "}
          <button
            type="button"
            onClick={onResend}
            className="font-bold text-[#2C4A3E] hover:text-[#1e332a]"
          >
            Resend it
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPComponent;