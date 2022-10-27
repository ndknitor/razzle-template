export type RenderConfig = {
    ssr : string[];
    ssg : string[],
    isr : {
        nisr : {
            path : string[];
            expries : number;
            capacity : number;
        }
        disr : {
            path : string[];
            listen : number;
            count : number;
            expries : number;
            capacity : number;
            trackingCapacity : number;
        }
    }
}