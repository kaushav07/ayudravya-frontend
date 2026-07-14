import { useState,} from "react"
import { FaArrowLeft } from "react-icons/fa";
import {Link,useNavigate } from 'react-router-dom'


const ForgotPassword=()=>{
    const [email,setEmail]=useState('');
    const navigate=useNavigate()
    const formSubmit=(e)=>{
           e.preventDefault();
           setEmail('')
           navigate('/forgot-password/otp')
    }
    return(
        
        <section className="flex min-h-125 w-full items-center justify-center px-4">
  <div className="w-full max-w-3xl rounded-2xl border p-6">
    <h2 className="text-2xl font-bold">Forgot Password</h2>

    <span className="mt-2 block text-gray-500 hover:text-black">
      No worries, we'll send you reset instructions soon
    </span>

    <form onSubmit={formSubmit} className="mt-6">
      <div className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-16 w-full border-b-2 border-b-black text-2xl outline-none"
        />

        <button
          type="submit"
          className="w-full bg-[#1e332a] p-3 text-white hover:bg-[#2C4A3E]"
          
        >
          Reset password
        </button>

        <span className="flex items-center justify-center gap-2">
          <FaArrowLeft />
          <Link
            to="/login"
            className="no-underline! text-gray-500! hover:text-[#2C4A3E]!"
          >
            Back to Login
          </Link>
        </span>
      </div>
    </form>
  </div>
</section>
    )
}
export default ForgotPassword