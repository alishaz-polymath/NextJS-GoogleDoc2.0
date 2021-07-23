import Head from 'next/head';
import Header from '../components/Header';
import DocumentRow from '../components/DocumentRow';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from 'next/image';
import { getSession, useSession } from "next-auth/client";
import Login from '../components/Login';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import { useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';




export default function Home() {
  const [session] = useSession();
  
  // console.log(session);
  if(!session) return <Login />

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [snapshot] = useCollectionOnce(
                      db
                        .collection('userDocs')
                        .doc(session.user.email)
                        .collection('docs')
                        .orderBy('timestamp','desc')
                    );

  const createDocument = () => {
    if (!input) return;

    db.collection('userDocs')
    .doc(session.user.email)
    .collection('docs')
    .add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
    setShowModal(false);
  };

  const modal = (
    <Modal size='sm' active={showModal} toggler={()=> setShowModal(false)} >
      <ModalBody>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter Name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e)=> setShowModal(false)}
          ripple="dark"        
        >Cancel</Button>
        <Button
          color="blue"
          onClick={createDocument} 
          ripple="light"
        >Create</Button>

      </ModalFooter>  
    </Modal>
  );


  return (
    <div className="">
      <Head>
        <title>Google Docs 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header session={session} />
      {modal}


      <section className="bg-[#f8f9fa] pb-8 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="xl" />
            </Button>
          </div>
          <div>
            <div className="relative h-40 w-32 border-2 cursor-pointer hover:border-blue-700" onClick={ () => setShowModal(true)}>
              <Image 
                src="https://links.papareact.com/pju" 
                layout="fill"
              />
            </div>
            <p className="ml-1 mt-2 font-semibold text-sm text-gray-700">Blank</p>
          </div>
        </div>
      </section>
      <section className="bg-white px-8">
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex items-center justify-between text-gray-700 text-sm">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-10">Date Created</p>
            <Icon name="folder" size="xl" color="gray" />
          </div>
            {snapshot?.docs.map(doc => (
              <DocumentRow 
                key={doc.id}
                id={doc.id}
                fileName={doc.data().fileName}
                date={doc.data().timestamp}
              />
            ))}

        </div>
      </section>

    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
}