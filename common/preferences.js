import { readFileSync, writeFileSync } from "fs";
import { me } from "appbit";

const DEBUG_MODE = false;
const FILE_NAME = "preferences.json";

export let prefs = {};

export function load() {  
  try {
    prefs = readFileSync(FILE_NAME, "json");   
    
    if (DEBUG_MODE) {
      console.log(FILE_NAME + " loaded:\n" + JSON.stringify(prefs));
    }    
    
    return true;
  } catch(error) {
    console.warn("Failed to load " + FILE_NAME + ". It is OK if no values were stored yet.");
    return false;
  }
}

export function save() {  
  try {
    writeFileSync(FILE_NAME, prefs, "json");
    
    if (DEBUG_MODE) {
      console.log(FILE_NAME + " saved:\n" + JSON.stringify(prefs));
    }   
    
    return true;
  } catch(error) {
    console.error("Failed to save " + FILE_NAME);
    return false;
  }
}

function init() {
  if (DEBUG_MODE) {
    console.log("App started, loading preferences");
  }   
  
  load();
  
  me.onunload = () => {
    if (DEBUG_MODE) {
      console.log("App is being unloaded, saving preferences");
    }   
    
    save();
  }
}

init();