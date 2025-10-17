// ================== Imports ==================
import React from "react";
import Layout from "../layout/Layout";
import { PageContainer } from "../components/PageContainer/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { GetUserData, UpdateUser } from "../services/api/user.services";
import { GetStockByUser } from "../services/api/stock.service";
import { useUser } from "../contexts/UserContext";

// ================== Constants ==================
const MOCK_STOCKS = [
  { idEstoque: 1, nomeEstoque: "Roof01" },
  { idEstoque: 2, nomeEstoque: "Paola01" },
  { idEstoque: 3, nomeEstoque: "Cozinha02" },
];

// ================== Component ==================
function Settings() {
  // ====== State ======
  const { userId } = useUser();

  const [userData, setUserData] = useState(null);
  const [stocks, setStocks] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nomePessoa: userData?.nomePessoa || "",
      email: userData?.email || "",
      defaultStockId: 1,
      showPromotionsOnly: false,
      preferredProductType: "",
      language: "pt-BR",
      darkMode: false,
      notifications: {
        expiringSoonThreshold: 14,
        enableEmailAlerts: true,
        dailySummary: true,
        notifyOnLowStock: true,
      },
    },
  });

  useEffect(() => {
    if (userData == null && userId != null) {
      GetUserData(userId).then((data) => {
        setUserData(data);
      });
    }
  }, [userData, userId]);

  useEffect(() => {
    if (stocks == null && userId != null) {
      GetStockByUser(userId).then((data) => {
        setStocks(data);
      });
    }
  }, [stocks, userId]);

  // ====== Event Handlers ======
  const onSubmit = (data) => {
    UpdateUser(data)
      .then(() => {
        toast.success("🔧Configurações salvas com sucesso!");
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao atualizar os dados de usuário.");
      });
  };

  // ====== Render ======
  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title="Perfil do Usuário" />
        <PageContainer.Body>
          <div className="h-screen">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white text-black p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6 text-orange-600">
                Configurações do Perfil
              </h2>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold block mb-1">Nome Completo</label>
                  <input
                    {...register("nomePessoa", {
                      required: "Nome é obrigatório",
                    })}
                    className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:outline-none"
                    defaultValue={userData?.nomePessoa || ""}
                  />
                  {errors.nomePessoa && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nomePessoa.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-semibold block mb-1">Estoque Padrão</label>
                    <select
                      {...register("defaultStockId")}
                      className="w-full p-2 border rounded-lg"
                      defaultValue={userData?.defaultStockId || 1}
                    >
                      {(stocks && stocks.length ? stocks : MOCK_STOCKS).map((stock) => (
                        <option key={stock.idEstoque} value={stock.idEstoque}>
                          {stock.nomeEstoque}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notificações</h3>

                <div>
                  <label className="font-semibold block mb-1">Dias para aviso de vencimento</label>
                  <input
                    type="number"
                    {...register("notifications.expiringSoonThreshold", {
                      min: { value: 1, message: "Deve ser no mínimo 1" },
                    })}
                    className="w-full p-2 border rounded-lg"
                    defaultValue={14}
                  />
                  {errors.notifications?.expiringSoonThreshold && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.notifications.expiringSoonThreshold.message}
                    </p>
                  )}
                </div>

                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...register("notifications.enableEmailAlerts")} defaultChecked />
                  <span>Receber alertas por e-mail</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...register("notifications.dailySummary")} defaultChecked />
                  <span>Resumo diário</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...register("notifications.notifyOnLowStock")} defaultChecked />
                  <span>Notificar quando estoque estiver baixo</span>
                </label>
              </div>

              {/* Save Button */}
              <div className="text-right pt-4">
                <button
                  type="submit"
                  className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition duration-200"
                >
                  Salvar Configurações
                </button>
              </div>
            </form>
          </div>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
}

export default Settings;
