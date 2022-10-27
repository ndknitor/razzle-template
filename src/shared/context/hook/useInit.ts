import { useContext, useEffect } from "react";
import Context from "../Context";

export default function useInit() {
    const {setInitLoading, initLoading} = useContext(Context);
    useEffect(() => {
        if (initLoading) {
            setInitLoading(false);
        }
    }, []);
}