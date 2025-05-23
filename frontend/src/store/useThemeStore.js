import { create } from 'zustand'

 export const useThemeStore = create((set) => ({
theme: localStorage.getItem("streamify-theme") || "dark", // or "night", "coffee"

  setTheme: (theme) =>{
    localStorage.setItem("streamify-theme" , theme);
    set({theme})
  } 

}))