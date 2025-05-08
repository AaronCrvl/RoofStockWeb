import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigateTo = (screen) => {
    navigate(`/${screen}`);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between mt-5 px-4">
        {/* Dashboard Cards */}
        {[
          {
            label: "Employee Management",
            icon: "https://img.icons8.com/ios-filled/50/user-group.png",
            screen: "EmployeeManagement",
          },
          {
            label: "Company Management",
            icon: "https://img.icons8.com/ios-filled/50/business.png",
            screen: "CompanyManagement",
          },
          {
            label: "Stock Daily Closure",
            icon: "https://img.icons8.com/ios-filled/50/calendar.png",
            screen: "StockClosureManagement",
          },
          {
            label: "Manage Stock",
            icon: "https://img.icons8.com/ios-filled/50/box.png",
            screen: "StockPage",
          },
        ].map(({ label, icon, screen }) => (
          <button
            key={screen}
            onClick={() => navigateTo(screen)}
            className="w-[47%] bg-white rounded-xl py-4 px-3 mb-3 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={icon}
              alt={label}
              className="w-10 h-10 mb-2 object-contain"
            />
            <span className="text-lg font-semibold text-gray-800 text-center">
              {label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;
