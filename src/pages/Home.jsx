import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen bg-white">
      {/* TopNav */}
      <div className="flex bg-blue-200 p-2">
        <div className="self-left ml-20">
          <img
            src="https://www.kindpng.com/picc/m/160-1607839_stock-app-icon-png-transparent-png.png"
            alt="Product Stock App Icon"
            width="50"
            height="50"
          />
        </div>
        <div className="ml-auto grid grid-cols-3 gap-1">
          {[
            {
              name: "Produtos",
              link: "/",
            },
            {
              name: "Desenvolvedores",
              link: "/",
            },
            {
              name: "Preços",
              link: "/",
            },
          ].map((item) => {
            return (
              <div className="text-xl">
                <Link to={item.link}>{item.name}</Link>
              </div>
            );
          })}
        </div>
        <div className="ml-auto mr-20">
          <button className="mr-2">Login In</button>
          <button>Sign Up</button>
        </div>
      </div>

      {/* PageBody */}
      <div>
        <div className="flex">
          <div className="w-1/2 mt-auto mb-auto">
            <div className="block">
              <span className="text-black text-6xl font-bold mb-10">
                Seu estoque na palma da mão, com agilidade e simplicidade.
              </span>
            </div>
            <div className="block mt-5">
              <span className="text-black text-xl">
                Monitore entradas, saídas e níveis de estoque em tempo real com
                praticidade e segurança. Tudo em um só lugar.
              </span>
            </div>
            <div className="flex mt-10 justify-center">
              <button className="mr-2">Começar agora</button>
              <button>Entre em contato</button>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="https://media.giphy.com/media/3oEduQAsYqF8z6g2xS/giphy.gif"
              alt="Gerenciamento de Inventário"
              className="w-full h-screen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
