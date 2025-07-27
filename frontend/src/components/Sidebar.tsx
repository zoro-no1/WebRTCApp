import Sender from "@/utils/Sender";
import React, { useState } from "react";





interface SidebarProps {
  user:string;
  nav: {name:string,id:string}[];

}

const Sidebar: React.FC<SidebarProps> = ({ user, nav }) => {
  const [open, setOpen] = useState(false);
  const setReceiver= Sender(state=>state.setReceiver)

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-900 text-white focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          flex flex-col bg-gray-900 text-white w-64 min-h-screen p-6 fixed top-0 left-0 z-40
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex
        `}
        style={{ height: "100vh" }}
      >
        <div className="flex items-center gap-4 mb-8">
         
          <div>
            <div className="font-bold">{user}</div>
          
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {nav.map(item => (
            <a
              key={item.id}
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              onClick={() => {setOpen(false); setReceiver(item.id)}}
            >
              {item.name}
            </a>
          ))}
        </nav>
       
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
