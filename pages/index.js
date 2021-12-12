
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from '../components/Login';
import Modal from '../components/Modal';
import { useRecoilState } from "recoil";
import { modalState} from "../atoms/modalAtom";
import Widgets from '../components/Widgets';

export default function Home({trendingResults, followResults, providers}) {

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  if(!session) return <Login providers = {providers}/>


  return (
    <div >
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen max-w-[1500px] mx-auto bg-black">
        {/* sidebar */}
        <Sidebar/>
        {/* Feed */}
        <Feed/>
        
        {/* widgets */}
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {/* Modal */}
        {isOpen && <Modal/>}
        
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);//server side rendering

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}