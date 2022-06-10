import { isClient } from "./isclient";

const defaults = {
    todos: []
}

const storage = {
        get(item: string){
            if(!isClient) return undefined;
            const Local = localStorage.getItem("local") ?? "";
            if (typeof Local == "undefined" || !Local) { // set defaults if not exist
                localStorage.setItem("local", JSON.stringify(defaults));
                return defaults; // return default data
            }
            try {
                const LocalItem = JSON.parse(Local);
                if (typeof LocalItem[item] == "undefined") {
                    localStorage.setItem("local", JSON.stringify(defaults));
                    return defaults;
                }
                return LocalItem[item];
            } catch (error) {
                localStorage.setItem("local", JSON.stringify(defaults));
                return defaults;
            }
        },
        set(key: string, value: any){
            if (!isClient) return undefined;
            const Local = localStorage.getItem("settings") ?? "";
            if (typeof Local == "undefined" || !Local) { // set defaults if not exist
                localStorage.setItem("local", JSON.stringify(defaults));
            }
            // After applying defaults
            try {
                const NewLocal = JSON.parse(Local);
                NewLocal[key] = value;
                localStorage.setItem("local", JSON.stringify(NewLocal));
            } catch (error) {
                localStorage.setItem("local", JSON.stringify(defaults));
            }
        }
}

export default storage;