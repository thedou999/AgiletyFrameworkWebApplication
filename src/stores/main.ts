import { defineStore } from "pinia";
import { Menu, IUser } from "../types/index";

const mainStore = defineStore('main',{
    state() {
        return{
            menuList: [] as Menu[],
            accessToken: null,
            refreshToken: null,
            user: {} as IUser
        }
    },

    getters:{

    },

    actions:{
        initMenu(menu:any){
            this.menuList = menu
        }
    },

    persist: {
        enabled: true,
        strategies:[{
            key: "main",
            storage: localStorage,
        }]
    }
    
})


export default mainStore