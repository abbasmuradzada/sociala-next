import axios, { AxiosInstance } from "axios";

export const HTTP = (() => {
  let $client: AxiosInstance;

  return {
    createClient() {
      if ($client) {
        return $client;
      }

      $client = axios.create({
        baseURL: "http://localhost:5000/api/",
      });

      console.log("clientim", $client);

      return $client;
    },
    client() {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZjMGU2MjMyODdhYTFmYjBjZWY0ZTciLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNTA2MDU1MSwiZXhwIjoxNjM1OTI0NTUxfQ.v7F6n7zvNFVOzDrwCSym4fAN94zRxpXPDMzBKyVwwLU";

      if (token) {
        $client.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      return $client;
    },
  };
})();
