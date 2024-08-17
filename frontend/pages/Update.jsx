import { useState } from "react";
import axios from "axios";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";


export function Update(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const handleNavigate = async () => {
        setLoading(true);
        try {
          // Simulate an async operation
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate('/dashboard');
        } catch (error) {
          console.error('Navigation failed:', error);
        } finally {
          setLoading(false);
        }
      };

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"update"} />
        <SubHeading label={"update your information here"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="Bharath" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Kumar" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="Bharath@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.put("https://payments-app-psi.vercel.app/v1/user/update", { body:{
              username,
              firstName,
              lastName,
              password
            }
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }

            });
} } label={"update"}  />
<div>
      <button
        onClick={handleNavigate}
        disabled={loading}
        className="flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white"
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          'Go to Dashboard'
        )}
      </button>
    </div>
  
</div>
</div>
</div>
</div> 
}
