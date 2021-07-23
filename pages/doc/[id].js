import TextEditor from "../../components/TextEditor";
import Login from "../../components/Login";
import { db } from "../../firebase";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/client";
import Router from "next/dist/next-server/server/router";


function Doc() {
    const [session] = useSession();
    const router = useRouter();
    const { id } = router.query;

    const [snapshot, loadingSnapshot] = useDocumentOnce(
            db
                .collection('userDocs')
                .doc(session?.user?.email)
                .collection('docs')
                .doc(id)
        );
    
        if(!loadingSnapshot && !snapshot?.data()?.fileName){
            router.replace("/");
        }


    if (!session) return <Login />;

    return (
        <div>
            <header className="flex justify-between items-center p-2 pb-1">
                <span onClick={()=>router.push("/")} className="cursor-pointer">
                    <Icon name="description" size="5xl" color="blue" />
                </span>

                <div className="flex-grow px-2">
                    <h2 className="text-sm">{snapshot?.data()?.fileName}</h2>
                    <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                        <p className="option">File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Insert</p>
                        <p className="option">Format</p>
                        <p className="option">Tools</p>
                    </div>
                </div>
                <Button
                        color="lightBlue"
                        buttonType="filled"
                        size="regular"
                        className="hidden md:inline-flex h-10"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                    >
                        <Icon name="people" size="md" /> SHARE
                </Button>
                <img alt="" className="rounded-full cursor-pointer h-10 w-10 ml-2" src={session.user.image} />                
            </header>
            <TextEditor />
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return {
      props: {
        session
      }
    };
  }