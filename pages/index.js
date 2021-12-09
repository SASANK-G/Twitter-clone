import { async } from '@firebase/util'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'

import { getProviders, getSession, useSession } from "next-auth/react";

export default function Home() {
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

        {/* Modal */}
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
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}