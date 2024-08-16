import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState} from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [success,setsuccess] = useState('idle');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const[isdisabled,setisdisabled] = useState(false)

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

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async () => {
                        setsuccess('processing')
                        setisdisabled(true)
                       try{ await axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                   setsuccess('success')  }
                    catch(e){
                        setsuccess('failed')
                    }
                    } } disabled = {isdisabled} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                          {success === 'processing' && 'Processing...'}
      {success === 'success' && 'Success!'}
      {success === 'failed' && 'Failed!'}
      {success === 'idle' && 'Initiate Transaction'}
                    </button>
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
    </div>
}