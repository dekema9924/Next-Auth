import { User } from 'lucide-react';
import { GlobeLock } from 'lucide-react';
import { Lock } from 'lucide-react';



export default function Home() {
  return (
    <>

      <main className=" flex text-white flex-col items-center justify-between p-10 bg-linear-to-b from-[#050816] via-[#0f1535] to-[#1e3a8a] min-h-screen ">
        {/* hero */}
        <div className="text-center  flex flex-col items-center justify-center p-10 w-full ">
          <h1 className="md:text-[2.5em] md:block text-xl md:w-125 leading-10 md:leading-[1.2] font-bold flex flex-col items-center justify-center">
            Better-Auth <span className="text-blue-600">Authentication Demo</span>
          </h1>
          <p className=" text-gray-200 my-4 w-full md:w-96 ">showcase better-auth. features and capabilities. All features on this demo are implemented with Better Auth and Prisma ORM  </p>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-blue-600 text-white px-6 py-2 md:w-44 rounded-lg md:mr-4  cursor-pointer">Try Authentication</button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 w-full rounded-lg cursor-pointer">View Dashboard</button>
          </div>
        </div>


        {/* cards */}
        <div className=' w-full flex md:flex-row  flex-col justify-center items-center mt-10  '>
          {
            [
              { title: "Secure Login", description: "Experience seamless and secure login with Better-Auth's advanced authentication methods.", image: Lock, imageBg: "bg-blue-100" },
              { title: "Multi-Factor Authentication", description: "Enhance your account security with multi-factor authentication options.", image: GlobeLock, imageBg: "bg-green-100" },
              { title: "Biometric Support", description: "Utilize biometric authentication for quick and secure access.", image: User, imageBg: "bg-purple-100" },
            ].map((card, index) => (
              <div key={index} className="border border-blue-600 h-66 shadow-md rounded-lg p-6 m-4 inline-block md:w-80 w-full ">
                <span className={` rounded-md ${card.imageBg} w-10 h-10 flex items-center justify-center `}>
                  <card.image className=" text-blue-600" size={20} />
                </span>
                <h2 className="text-xl font-bold my-4">{card.title}</h2>
                <p className="text-gray-300">{card.description}</p>
              </div>
            ))
          }
        </div>

      </main>
    </>
  );
}
