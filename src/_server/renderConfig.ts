const config : RenderConfig =
{
    csr : [],
    ssg : {
        path : [],
        storeMode : "ROM"
    },
    isr : {
        nisr : {
            path : [],
            expries : 10
        },
        disr : {
            storeMode : "RAM",
            capacity : 10,
            count : 10,
            expries : 10,
            listen : 10
        }
    }
} 
export type RenderConfig = {
    csr : string[];
    ssg : {
        storeMode : StoreMode;
        path : string[];
    },
    isr : {
        nisr : {
            path : string[];
            expries : number;
        }
        disr : {
            storeMode : StoreMode;
            capacity : number;
            expries : number;
            count : number;
            listen : number;
        }
    }
}
type StoreMode = "RAM" | "ROM";