export const getBaseUrl = (env) => {
  if (env == "dev") return "https://localhost:7237";
  else
    return "https://roofstockbackend-e9erc8bnh7hpbje0.eastus-01.azurewebsites.net";
};
