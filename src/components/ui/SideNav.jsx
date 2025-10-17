import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSideNavRedirect = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      text: "Movimentações",
      link: "/transaction",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-repeat"
        >
          <polyline points="17 1 21 5 17 9"></polyline>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
          <polyline points="7 23 3 19 7 15"></polyline>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>
      ),
    },
    {
      text: "Fechamento",
      link: "/closure",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-check-circle"
        >
          <path d="M9 12l2 2l4 -4"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
    },
    {
      text: "Relatórios",
      link: "/reports",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-file-text"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="11" x2="12" y2="11" />
          <line x1="8" y1="14" x2="12" y2="14" />
          <line x1="8" y1="17" x2="12" y2="17" />
          <line x1="15" y1="17" x2="15" y2="14" />
          <line x1="17" y1="17" x2="17" y2="12" />
          <line x1="19" y1="17" x2="19" y2="15" />
        </svg>
      ),
    },
  ];

  const bottomItem = {
    text: "Configurações",
    link: "/settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894a1.125 1.125 0 001.356.9l.893-.23a1.125 1.125 0 011.37.812l.26 1.04c.13.52-.06 1.07-.485 1.39l-.737.546a1.125 1.125 0 000 1.787l.737.546c.424.32.615.87.485 1.39l-.26 1.04c-.15.6-.77.96-1.37.812l-.893-.23a1.125 1.125 0 00-1.356.9l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894a1.125 1.125 0 00-1.356-.9l-.893.23c-.6.15-1.22-.212-1.37-.812l-.26-1.04a1.125 1.125 0 01.485-1.39l.737-.546a1.125 1.125 0 000-1.787l-.737-.546a1.125 1.125 0 01-.485-1.39l.26-1.04a1.125 1.125 0 011.37-.812l.893.23a1.125 1.125 0 001.356-.9l.149-.894z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-orange-600 bg-white shadow-md sm:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r w-64 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:static sm:flex sm:flex-col sm:w-64`}
      >
        {/* Logo */}
        <div className="p-5 border-b flex items-center justify-between">
          <span
            className="text-3xl font-bold cursor-pointer text-orange-600"
            onClick={() => {
              handleSideNavRedirect("/dashboard");
            }}
          >
            RoofStock
          </span>

          {/* Close button on mobile */}
          <button
            className="sm:hidden p-1 rounded-md hover:bg-orange-100"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSideNavRedirect(item.link)}
              className="flex items-center p-2 rounded-md text-gray-800 hover:bg-orange-100 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              {item.icon}
              <span className="ml-3 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom Item */}
        <div className="p-4 border-t">
          <div
            onClick={() => handleSideNavRedirect(bottomItem.link)}
            className="flex items-center p-2 rounded-md text-gray-800 hover:bg-orange-100 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            {bottomItem.icon}
            <span className="ml-3 text-sm font-medium">{bottomItem.text}</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideNav;
