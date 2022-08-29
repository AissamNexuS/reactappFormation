"use strict";
import CookieManager from "@react-native-cookies/cookies";
import { displayToast } from './lib/interactions'
import storage from "./storage";



const baseURL = `https://api.formation.flexi-apps.com`;

const publicUrls = [
  `https://api.formation.flexi-apps.com/api/v1/auth/signin`,
  // `${baseURL}${loginUrlDoctor()}`,
  // `${baseURL}${signOutUrlUser()}`,
  // `${baseURL}${signOutUrlDoctor()}`,
  // `${baseURL}${passwordUrlUser()}`,
  // `${baseURL}${passwordUrlDoctor()}`,
  `${baseURL}/cgus/application`,
];


const Api = () => {

  const core = (url, method, data, isForm) => {
    const promise = new Promise((resolve, reject) => {
      return storage.getSession().then((cookie) => {
        console.log(url);
        console.log(data);
        // configure request body
        const body = isForm ? data : JSON.stringify(data);

        // configure request header
        const formHeaders = { cookie: cookie };

        const headers = isForm
          ? formHeaders
          : {
            Accept: "application/json",
            "Content-Type": "application/json",
            cookie: cookie,
          };

        /**
         * Send undefined cookie
         * to receive the newest (login)
         */
        if (url === publicUrls[0] || url === publicUrls[1] || cookie === "") {
          headers.cookie = undefined;
        }

        /**
         * Delete local cookie  (logout)
         */
        if (url === publicUrls[2] || url === publicUrls[3]) {
          storage.setSession("");
        }

        let fetchParams = {
          method,
          headers,
          body,
          credentials: "include",
        };

        // Clearing all cookies stored by native cookie managers.
        return CookieManager.clearAll().then(() => {
          return fetch(url, fetchParams)
            .then((response) => {
              if (url === publicUrls[0] || url === publicUrls[1]) {
                storage.setSession("");
              }

              const ckie = response.headers.get("set-cookie");
              console.log("cooooookie:   ", response.headers);

              /**
               * Erease existing cookie
               */
              if (response.status === 401) {

                displayToast("Nom d'utilisateur ou mot de passe erroné")


              }

              if (response.status >= 200 && response.status < 300) {
                if (ckie && url === publicUrls[0]) {
                  storage.setSession(ckie);

                }
                resolve(response);
              } else {
                response
                  .json()
                  .then((result) => {
                    reject(result);
                  })
                  .catch(() => reject(null));
              }
            })
            .catch((err) => {
              if (err.name === "AbortError") {
                reject(new Error("Response timed out"));
              } else {
                reject(err);
              }
            })
            .finally(() => {
              // if (url === publicUrls[2] || url === publicUrls[3]) {
              //   storage.setSession('');
              // }
            });
        });
      });
    });

    return promise;
  };

  return {
    get: (path, payload) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;
        core(url, "GET", payload)
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      });
      return promise;
    },
    post: (path, payload, isForm) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;

        core(url, "POST", payload, isForm)
          .then((reponse) => reponse.json())
          .then((data) => {
            // if (url === publicUrls[0]) {
            //   storage.setSession(data._id);
            // }
            resolve(data);
          })
          .catch((error) => reject(error));
      });
      return promise;
    },
    put: (path, payload) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;
        core(url, "PUT", payload)
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      });
      return promise;
    },
    delete: (path) => {
      const promise = new Promise((resolve, reject) => {
        const url = `${baseURL}${path}`;
        core(url, "DELETE")
          .then((reponse) => reponse.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      });
      return promise;
    },
  };
};

export default Api;
