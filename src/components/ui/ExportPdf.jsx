import React from "react";

const ExportPdf = ({ ExportFunction, sortedData }) => {
  return (
    <div className="flex justify-end col-span-5 mb-4">
      <button
        onClick={() => ExportFunction(sortedData)}
        className="text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center space-x-2 px-3 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m0 0l-4-4m4 4l4-4m-8-6h8a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2v-6a2 2 0 012-2z"
          />
        </svg>
        <span>Export All to PDF</span>
      </button>
    </div>
  );
};

export default ExportPdf;
