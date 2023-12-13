import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_LINK, GET_LINKS } from "../Graphql/index";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

function CreateLink() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const { loading, error, data } = useQuery(GET_LINKS);
  const [createLink] = useMutation(CREATE_LINK);

  const links = useLiveQuery(() => db.links.toArray());

  // window.addEventListener("online", () => {
  //   syncData();
  // });

  // const syncData = async () => {
  //   try {
  //     if (links.length > 0) {
  //       for (let i = 0; i < links.length; i++) {
  //         const result = await createLink({
  //           variables: { input: { title: links[i].title, address: links[i].address } },
  //           context: {
  //             headers: {
  //               Authorization: `${localStorage.getItem("authToken")}`,
  //             },
  //           },
  //           refetchQueries: [{ query: GET_LINKS }],
  //         });
  //         console.log(result);
  //         await db.links.delete(links[i].id);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleCreateLink = async () => {
    try {
      if (navigator.onLine) {
        const result = await createLink({
          variables: { input: { title, address } },
          context: {
            headers: {
              Authorization: `${localStorage.getItem("authToken")}`,
            },
          },
          refetchQueries: [{ query: GET_LINKS }],
        });

        console.log(result);

        setTitle("");
        setAddress("");
      } else {
        await db.links.add({
          title,
          address,
        });
        setTitle("");
        setAddress("");
      }
    } catch (error) {
      console.error(error);
      setTitle("");
      setAddress("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Create Link</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateLink();
          }}
        >
          <input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br />
          <input placeholder="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <br />
          <button type="submit">Create Link</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error : {error.message}</p>
        ) : (
          <div>
            {/* data from server */}
            {data.links.length > 0 ? (
              data.links.map((link) => (
                <div
                  key={link.id}
                  style={{
                    border: "1px solid white",
                    margin: "10px",
                    padding: "2px",
                  }}
                >
                  <p>{link.title}</p>
                  <p>{link.address}</p>
                </div>
              ))
            ) : (
              <p>No links available</p>
            )}

            {/* data from dixie */}
            {links.map((link) => (
              <div
                key={link.id}
                style={{
                  border: "1px solid white",
                  margin: "10px",
                  padding: "2px",
                }}
              >
                <p>{link.title}</p>
                <p>{link.address}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default CreateLink;
