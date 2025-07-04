import React, { useState, useEffect } from "react";

useEffect;

function MessageModal({ message, options }) {
  const [isOptionSelected, setIsOptionSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (isOptionSelected) {
        options[selectedIndex].func();       
    }
  }, [isOptionSelected, selectedIndex, options]);

  const handleOptionSelection = (index) => {
    setIsOptionSelected(true);
    setSelectedIndex(index);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <form className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="flex w-full">
                    <span
                      className="text-base font-semibold text-6xl text-gray-900"
                      id="modal-title"
                    >
                      Aviso
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="font-2xl font-semibold text-black">
                      {message}
                    </p>
                    <></>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex bg-gray-50 gap-4 px-4 py-3 justify-center items-center sm:flex sm:flex-row-reverse sm:px-6">
              {options.map((option, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleOptionSelection(index)}
                  className={`p-2 bg-${option.color}-500 rounded-lg`}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MessageModal;
