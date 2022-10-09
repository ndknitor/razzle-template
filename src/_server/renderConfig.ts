export type RenderConfig = {
    ssr : string[];
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
            listen : number;
            count : number;
            expries : number;
            storeMode : StoreMode;
            capacity : number;
            trackingCapacity : number;
        }
    }
}
type StoreMode = "RAM" | "ROM";