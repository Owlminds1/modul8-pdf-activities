import Link from "next/link";
import LinkData from "@/lib/routes.json"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-start  bg-[url(/bg/bg.jpg)] bg-fixed bg-cover bg-center p-5">
    <h5 className="text-[50px] py-5 text-red-600">Module 8 PDF Activities</h5>
    <div className="grid grid-cols-12 gap-4 min-w-125 place-items-center text-center">
      <div className="col-span-3 min-w-25 font-bold border border-black bg-purple-500 py-1 px-4 rounded-lg">
        Sr. no.
      </div>
      <div className="col-span-6 min-w-125 font-bold border border-black bg-purple-500 py-1 px-4 rounded-lg">
        Activity Name
      </div>
      <div className="col-span-3 w-full border font-bold  border-black bg-purple-500 py-1 px-4 rounded-lg">
        Activity Link
      </div>
    </div>

    {
      LinkData.map((item,index)=>(
        <div key={index} className="grid grid-cols-12 gap-4 min-w-125 place-items-center text-center">
        <div className="col-span-3 min-w-25 border border-black bg-red-400 py-1 px-4 text-black rounded-lg">
          {index + 1}
        </div>
        <div  className="col-span-6 min-w-125 border text-black border-black bg-red-400 py-1 px-4 rounded-lg">
          {item.activity}
        </div>
        <div className="col-span-3 w-full border text-black border-black bg-red-400 py-1 px-4 rounded-lg">
        <Link  href={`/${item.link}`}>{item.link}</Link>
        </div>
      </div>
      ))
    }
   
  </div>
  );
}
