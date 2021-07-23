import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut } from "next-auth/client";

function Header( {session} ) {
    // const [session] = useSession();
    // console.log(session);
    return (
        <header className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="h-16 w-16 border-0"
            >
                <Icon name="menu" size="xl" />
            </Button>
            <Icon name="description" size="3xl"  color="blue" />
            <h1 className="hidden sm:inline-flex ml-2 text-gray-700">
                Docs
            </h1>
            <div className="flex flex-grow items-center px-5 py-2 bg-gray-100 mx-5 md:mx-20  text-gray-600 rounded-lg focus-within:shadow-md focus-within:text-gray-700">
                <Icon name="search" size="xl" color="gray" />
                <input type="text" className="flex-grow px-5 text-sm bg-transparent focus:outline-none" placeholder="Search" />
            </div>

            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="ml-5 md:ml-20 h-16 w-16 border-0"
            >
                <Icon name="apps" size="xl" color="gray" />
            </Button>

            <img 
                onClick={signOut}
                loading="lazy"
                // onClick={signOut}
                className="cursor-pointer h-8 w-8 rounded-full ml-2"
                // src={session.user.image}
                src={session?.user?.image}
                alt=""
            />
            {/* {console.log(session)} */}
        </header>
    )

}

export default Header;