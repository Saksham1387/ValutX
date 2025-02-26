import SignupForm from "@/components/signup-form"
import { div } from "framer-motion/client"

const AuthLayout = () =>{
    return(
        <div className="flex items-center justify-center">
             <SignupForm/>
        </div>
    )
}

export default AuthLayout;