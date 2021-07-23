import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

function DocumentRow({id, fileName, date}) {
    const router = useRouter();

    return(
        <div onClick={()=> router.push(`/doc/${id}`)} className="flex items-center p-2 rounded-lg hover:bg-gray-50 text-gray-700 text-xs">
            <Icon name="article" size="xl" color="blue"/>
            <p className="flex-grow pl-3 w-8 pr-8 truncate">{fileName}</p>
            <p className="pr-5">{date?.toDate().toLocaleDateString()}</p>
            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="border-0"
            >
                <Icon name="more_vert" size="xl" />
            </Button>
        </div>
    )
}

export default DocumentRow;