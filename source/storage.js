/**
 * Copyright (c) Flexi Apps.
 *
 * Functions to save and retrieve datas from AsyncStorage
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
//import reportError from "lib/errorHandler";

const appName = require("./../package.json").name;

function getSession() {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const result = await AsyncStorage.getItem(
        `@fl${appName.toLowerCase()}` + ":session"
      );
      resolve(result);
    } catch (error) {
      //reportError("get session error", error);
      reject(error);
    }
  });
  return promise;
}

function setSession(session) {
  var promise = new Promise((resolve) => {
    try {
      AsyncStorage.setItem(`@fl${appName.toLowerCase()}` + ":session", session);
      resolve();
    } catch (error) {
      //reportError("set session error", error);
    }
  });

  return promise;
}

function getAlreadyIn() {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const result = await AsyncStorage.getItem(
        `@fl${appName.toLowerCase()}` + ":alreadyIn"
      );
      resolve(result);
    } catch (error) {
      //reportError("get already in error", error);
      reject(error);
    }
  });
  return promise;
}

function setAlreadyIn(already) {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem(
        `@fl${appName.toLowerCase()}` + ":alreadyIn",
        already
      );
      resolve();
    } catch (error) {
      //reportError("set already in error", error);
      reject(error);
    }
  });

  return promise;
}

function clearSession() {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.removeItem(`@fl${appName.toLowerCase()}` + ":session");
      resolve();
    } catch (error) {
      //reportError("remove session error", error);
      reject(error);
    }
  });

  return promise;
}

function getSmsCode() {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const result = await AsyncStorage.getItem("@zenobeecreator:smscode");
      resolve(result);
    } catch (error) {
      //reportError("get already in error", error);
      reject(error);
    }
  });
  return promise;
}

function setSmsCode(code) {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem("@zenobeecreator:smscode", code);
      resolve();
    } catch (error) {
      //reportError("set already in error", error);
      reject(error);
    }
  });

  return promise;
}

function clearSmsCode() {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.removeItem("@zenobeecreator:smscode");
      resolve();
    } catch (error) {
      //reportError("remove code error", error);
      reject(error);
    }
  });

  return promise;
}
function getOneSignalPlayerId() {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const result = await AsyncStorage.getItem("PlayerId");
      resolve(result);
    } catch (error) {
      //reportError("get already in error", error);
      reject(error);
    }
  });
  return promise;
}

function setOneSignalPlayerId(code) {
  var promise = new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem("PlayerId", code);
      resolve();
    } catch (error) {
      //reportError("set already in error", error);
      reject(error);
    }
  });

  return promise;
}

export default {
  getSession,
  setSession,
  getAlreadyIn,
  setAlreadyIn,
  clearSession,
  getSmsCode,
  setSmsCode,
  clearSmsCode,
  getOneSignalPlayerId,
  setOneSignalPlayerId,
};
