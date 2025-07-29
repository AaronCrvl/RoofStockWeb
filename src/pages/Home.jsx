// ================== Imports ==================
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/ui/Footer";
import homeStock from "../assets/images/HomeStock.jpg";

// ================== Component ==================
function Home() {
  // ====== State ======
  const navigate = useNavigate();

  // ====== Event Handlers ======
  const handleRedirect = (page) => {
    navigate("/".concat(page));
  };

  // ====== Render ======
  return (
    <div className="h-screen bg-white">
      {/* TopNav */}
      <div className="flex bg-orange-300 p-2">
        <div className="flex self-left ">
          <img
            src="https://www.kindpng.com/picc/m/160-1607839_stock-app-icon-png-transparent-png.png"
            alt="Product Stock App Icon"
            width="50"
            height="50"
          />
          <span className="ml-2 text-4xl font-semibold">RoofStock</span>
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
          ].map((item, index) => {
            return (
              <div className="text-xl" key={index}>
                <span className="font-bold" onClick={handleRedirect(item.link)}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="ml-auto mr-20">
          <button className="mr-2" onClick={() => handleRedirect("login")}>
            Login In
          </button>
          <button onClick={() => handleRedirect("createAccount")}>
            Criar Conta
          </button>
        </div>
      </div>

      {/* PageBody */}
      <div>
        <div className="flex bg-white">
          <div className="w-1/2 mt-auto mb-auto h-full">
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
            {/* <div className="flex mt-10 justify-center">
              <button className="mr-2">Começar agora</button>
              <button>Entre em contato</button>
            </div> */}
          </div>
          <div className="w-2/3">
            <img
              src={homeStock}
              alt="Gestão de Estoque"
              className="w-full h-screen border-2 border-white"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
