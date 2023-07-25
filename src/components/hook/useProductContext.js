import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";

export function useProductContext(){
    const context = useContext(ProductContext);
        if (context === undefined){
            throw new Error('Fora do contexto');
        }
    return context;
}