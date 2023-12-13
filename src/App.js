import "./App.css";
import { RouterProvider } from "react-router-dom";
// import { useQuery, gql } from "@apollo/client";
import router from "./Routes";

function App() {
  // const GET_LOCATIONS = gql`
  //   query GetLocations {
  //     locations {
  //       id
  //       name
  //       description
  //       photo
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(GET_LOCATIONS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  return <RouterProvider router={router} />;
}

export default App;
