import { Typography } from "@material-tailwind/react";
import logo from "../../assets/images/logo.png";
 

 
const currentYear = new Date().getFullYear();
 
export default function AdminFooter() {
  return (
    <footer className="relative ">
      <div className="w-full">
     
        <div className="w-full  bg-primary">
         
         <div className="w-[80%] mx-auto flex flex-col items-center justify-center border-t border-blue-gray-50 py-4"><img src={logo} alt="logo" />
        
          </div>
        </div>
    
      </div>
    </footer>
  );
}