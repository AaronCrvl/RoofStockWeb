export const getBaseUrl = (env) => {
  // Preferir variável de ambiente VITE_API_BASE_URL quando disponível
  if (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (env == "dev") return "https://localhost:7237";
  else
    return "https://roofstockbackend-e9erc8bnh7hpbje0.eastus-01.azurewebsites.net";
};
