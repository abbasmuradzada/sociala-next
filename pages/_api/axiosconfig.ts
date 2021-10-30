import axios, { AxiosInstance } from "axios";

export const HTTP = (() => {
  let $client: AxiosInstance;
  // const { token } = useAuth()

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
      const token = localStorage.getItem('token')
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc2YzVlYWU3NWZkNDY3YjkzNGM0MzkiLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNTE3Mzg2NiwiZXhwIjoxNjM2MDM3ODY2fQ.zy-5FBTne-J-Io4lmjLI-z4vzRYqPeM3Zf42PTv98WA";

      if (token) {
        $client.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      return $client;
    },
  };
})();
