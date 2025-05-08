import React, { useEffect, useState } from "react";

const MonthlyMovement = ({ boardData }) => {
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  
  const animateNumber = (value, setState) => {
    let start = 0;
    const end = value;
    const duration = 1000; 
    const stepTime = Math.abs(Math.floor(duration / (end - start)));

    let timer = setInterval(() => {
      start += 1;
      setState(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    animateNumber(boardData.overviewMensal.entradasMes, setEntradas);
    animateNumber(boardData.overviewMensal.saidasMes, setSaidas);
  }, [boardData]);

  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold mb-4 text-black">
        Movimentação Mensal {boardData.nomeEstoque}
      </h2>
      <div className="flex justify-between items-center bg-lightgray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
        {/* Entradas */}
        <div className="flex items-center hover:scale-110 transition-all duration-300 ease-in-out transform hover:text-green-600">
          <img
            src="https://www.freeiconspng.com/thumbs/up-arrow-png/up-arrow-png-19.png"
            alt="arrow-up"
            className="w-12 h-12 mr-3 transition-transform duration-300 ease-in-out transform hover:scale-125"
          />
          <p className="text-2xl font-semibold text-black">{entradas}</p>
        </div>

        {/* Saídas */}
        <div className="flex items-center hover:scale-110 transition-all duration-300 ease-in-out transform hover:text-green-600">
          <img
            src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-down-arrow-icon-png-image_4184125.jpg"
            alt="arrow-down"
            className="w-12 h-12 mr-3 transition-transform duration-300 ease-in-out transform hover:scale-125"
          />
          <p className="text-2xl font-semibold text-black">{saidas}</p>
        </div>

        {/* Current Date */}
        <p className="text-sm text-black">
          {new Date().toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
};

export default MonthlyMovement;
