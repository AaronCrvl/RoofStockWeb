import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-300 px-4 py-6 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} RoofStock. Todos os direitos reservados.
        </p>

        <div className="flex flex-col sm:flex-row sm:space-x-6 items-center gap-2 sm:gap-0">
          <span
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Início
          </span>
          <span
            onClick={() => navigate("/sobre")}
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Sobre
          </span>
          <span
            onClick={() => navigate("/contato")}
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Contato
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
