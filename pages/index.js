import Head from 'next/head'
import Sidebar from '../components/Sidebar'

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
        {/* widgets */}

        {/* Modal */}
      </main>
    </div>
  )
}
