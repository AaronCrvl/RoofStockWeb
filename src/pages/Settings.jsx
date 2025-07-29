import React from "react";
import Layout from "../layout/Layout";
import { PageContainer } from "../components/PageContainer/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MOCK_STOCKS = [
  { idEstoque: 1, nomeEstoque: "Roof01" },
  { idEstoque: 2, nomeEstoque: "Paola01" },
  { idEstoque: 3, nomeEstoque: "Cozinha02" },
];

const defaultValues = {
  fullName: "Paola Almeida",
  email: "paola@example.com",
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
};

const Settings = () => {
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    toast.success("Configurações salvas com sucesso!");
    console.log("🔧 Saved user config:", data);
  };

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
                  <label className="font-semibold block mb-1">
                    Nome Completo
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Nome é obrigatório",
                    })}
                    className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-semibold block mb-1">Email</label>
                  <input
                    {...register("email", {
                      required: "Email é obrigatório",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email inválido",
                      },
                    })}
                    className="w-full p-2 border rounded-lg focus:ring-orange-500 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <div>
                  <label className="font-semibold block mb-1">
                    Estoque Padrão
                  </label>
                  <select
                    {...register("defaultStockId")}
                    className="w-full p-2 border rounded-lg"
                  >
                    {MOCK_STOCKS.map((stock) => (
                      <option key={stock.idEstoque} value={stock.idEstoque}>
                        {stock.nomeEstoque}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Tipo Preferido de Produto
                  </label>
                  <select
                    {...register("preferredProductType")}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Todos</option>
                    <option value={0}>Alcoólico</option>
                    <option value={1}>Sem Álcool</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("showPromotionsOnly")}
                    />
                    <span>Mostrar apenas produtos em promoção</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register("darkMode")} />
                    <span>Ativar modo escuro</span>
                  </label>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notificações</h3>

                <div>
                  <label className="font-semibold block mb-1">
                    Dias para aviso de vencimento
                  </label>
                  <input
                    type="number"
                    {...register("notifications.expiringSoonThreshold", {
                      min: { value: 1, message: "Deve ser no mínimo 1" },
                    })}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.notifications?.expiringSoonThreshold && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.notifications.expiringSoonThreshold.message}
                    </p>
                  )}
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("notifications.enableEmailAlerts")}
                  />
                  <span>Receber alertas por e-mail</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("notifications.dailySummary")}
                  />
                  <span>Resumo diário</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("notifications.notifyOnLowStock")}
                  />
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
};

export default Settings;
