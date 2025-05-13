import React from "react";

function SideNav() {
  return (
    <div className="p-5 h-full">
      <span className="place-self-start text-4xl font-bold">RoofStock</span>
      <div className="mt-20 w-full">
        {[
          {
            text: "Movimentações",
            link: "/movement",
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
            text: "Marcas",
            link: "/brands",
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
                className="feather feather-tag"
              >
                <path d="M20 12v7a2 2 0 0 1 -2 2h-7l-8 -8a2 2 0 0 1 0 -2l7 -7a2 2 0 0 1 2 0l8 8z"></path>
                <line x1="16" y1="8" x2="16.01" y2="8"></line>
              </svg>
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="block mt-10 hover:border-t-2 hover:shadow-xl hover:border-b-2 hover:border-gray-400 hover:cursor-pointer w-full hover:scale-125 transition delay-50 duration-300 ease-in-out"
          >
            <div className="flex  rounded-lg p-2">
              <div>{item.icon}</div>
              <span key={index} className="ml-4 place-self-start block">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black/50">
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
        <span>Configurações</span>
      </div>
    </div>
  );
}

export default SideNav;
