import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
// import { useCompany } from '../contexts/CompanyContext';
import { getCompaniesByUserId } from "../../services/api/company.services";

const TopBar = () => {
  // Hooks ------------------------------------->
  // const { userId } = useUser();
  const userId = 1;
  // const { setAppCompany } = useCompany();
  const setAppCompany = 1;

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [availableCompanies, setAvailableCompanies] = useState([
    { idEmpresa: 1, nomeEmpresa: "Rooftop Bar" },
    { idEmpresa: 2, nomeEmpresa: "Restaurante Brilhante" },
  ]);

  useEffect(() => {
    if (!availableCompanies.length) {
      // Fetch companies if the list is empty
      getCompaniesByUserId(userId).then((companies) =>
        setAvailableCompanies(companies)
      );
    }

    if (availableCompanies.length > 0 && selectedCompany === null) {
      setSelectedCompany(availableCompanies[0]);
    }
  }, [availableCompanies, selectedCompany, userId]);

  // useEffect(() => {
  //   if (selectedCompany !== null) {
  //     setAppCompany(selectedCompany);
  //   }
  // }, [selectedCompany, setAppCompany]);

  // JSX ------------------------------------->
  return (
    <div className="bg-orange-400 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">        
          <h1 className="text-2xl font-semibold">RoofStock</h1>
          {/* Company Selector */}
          <div className="ml-auto items-center space-x-2">
            <label htmlFor="company" className="text-lg">
              Company:
            </label>
            <select
              id="company"
              value={selectedCompany?.idEmpresa || ""}
              onChange={(e) => {
                const company = availableCompanies.find(
                  (c) => c.idEmpresa === parseInt(e.target.value)
                );
                setSelectedCompany(company);
              }}
              className="bg-gray-600 p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {availableCompanies.map((company) => (
                <option key={company.idEmpresa} value={company.idEmpresa}>
                  {company.nomeEmpresa}
                </option>
              ))}
            </select>
          </div>

          {/* Add more items to the top bar if needed */}
        </div>      
    </div>
  );
};

export default TopBar;
