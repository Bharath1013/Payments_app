import { useNavigate } from "react-router-dom"

export const Appbar = () => {
    const navigate = useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PaymetsApp
        </div>
        <div className="flex">
        <div className="flex flex-col justify-center underline h-full mr-4"> <button onClick={async ()=>{
                navigate('/transactions');
           }
         }
            >Transaction History</button> </div>

           <div className="flex flex-col justify-center underline h-full mr-4"> <button onClick={async ()=>{
                 localStorage.removeItem('token');
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate('/signin');
           }
         }
            >Logout</button> </div>

            
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2"> 

                <div className="flex flex-col justify-center h-full text-xl">
                    <button onClick={()=>{navigate('/update')}}> U </button>
                </div>
            </div>
        </div>
 </div>
}
