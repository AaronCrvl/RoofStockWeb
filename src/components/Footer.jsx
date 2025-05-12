import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-300 px-4 py-6 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} RoofStock. Todos os direitos reservados.
        </p>
        <div className="flex space-x-4">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            Início
          </span>
          <span
            onClick={() => navigate("/sobre")}
            className="cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            Sobre
          </span>
          <span
            onClick={() => navigate("/contato")}
            className="cursor-pointer hover:text-blue-600 transition-colors duration-300"
          >
            Contato
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
