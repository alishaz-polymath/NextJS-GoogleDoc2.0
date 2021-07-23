import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from "next-auth/client"

function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {/* <Image 
                src="https://links.papareact.com/lui"
                height="300"
                width="550"
                objectFit="contain"
            /> */}
            <svg className="w-44" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path><path fill="#bbdefb" d="M40 13L30 13 30 3z"></path><path fill="#1565c0" d="M30 13L40 23 40 13z"></path><path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path></svg>
            <h1 className="text-2xl text-gray-700"><span className="font-semibold">Google</span> Docs</h1>
            <Button
                className="mt-6 h-8 w-32 text-sm border-0"
                color="blue"
                buttonType="filled"
                ripple="light"
                onClick={signIn}
            >
                Login
            </Button>
        </div>
    )
}

export default Login;