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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU5ODdlMzQyNDlkOTI0OGMxZTExNTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzMzg5NTYyMywiZXhwIjoxNjM0NzU5NjIzfQ.aG_KhqmhmkbcBoxkeE16TTPmHvG5SAeq1y5r6yj_9SE";

      if (token) {
        $client.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      return $client;
    },
  };
})();
