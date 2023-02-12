import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { actionTypes } from "../state/ProductState/actionTypes";
import { initialState, ProductReducer } from "../state/ProductState/productReducer";
export const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({children}) => {
const [state, dispatch] = useReducer(ProductReducer, initialState);

useEffect(()=>{
  dispatch({type:actionTypes.FETCHING_START})
  fetch("http://localhost:5000/products")
  .then( res=> res.json())
  .then(data => dispatch({type:actionTypes.FETCHING_SUCCESS, payload:data.data}))
  .catch(()=>{
    dispatch({type:actionTypes.FETCHING_ERROR})
  })
} ,[]);

const value ={
  state,
  dispatch,
}
  return (
      <PRODUCT_CONTEXT.Provider value={value}>
        {children}
      </PRODUCT_CONTEXT.Provider>

  );
};
export const useProducts = ()=>{
  const context = useContext(PRODUCT_CONTEXT)
  return context;
}
export default ProductProvider;

// import React, { createContext, useContext, useEffect, useState } from "react";

// export const PRODUCT_CONTEXT = createContext();

// const ProductProvider = ({children}) => {
//   const [data, setData] = useState();
//   useEffect( ()=>{
//     fetch("http://localhost:5000/products")
//     .then(res => res.json())
//     .then(data => setData(data.data) )
//   },[]);
//   const value ={
//     data,
//   }
//   return (
//     <PRODUCT_CONTEXT.Provider value={value}>
//        {children}
//     </PRODUCT_CONTEXT.Provider>
//   );
// };
// export const useProducts= () =>{
//   const context = useContext(PRODUCT_CONTEXT);
//   return context;
// }
// export default ProductProvider;

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useState,
// } from "react";
// import { actionTypes } from "../state/ProductState/actionTypes";
// import {
//   productReducer,
//   initialState,
// } from "../state/ProductState/productReducer";

// const PRODUCT_CONTEXT = createContext();

// const ProductProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(productReducer, initialState);

//   console.log(state);

//   useEffect(() => {
//     dispatch({ type: actionTypes.FETCHING_START });
//     fetch("http://localhost:5000/products")
//       .then((res) => res.json())
//       .then((data) =>
//         dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data.data })
//       )
//       .catch(() => {
//         dispatch({ type: actionTypes.FETCHING_ERROR });
//       });
//   }, []);

//   const value = {
//     state,
//     dispatch,
//   };

//   return (
//     <PRODUCT_CONTEXT.Provider value={value}>
//       {children}
//     </PRODUCT_CONTEXT.Provider>
//   );
// };

// export const useProducts = () => {
//   const context = useContext(PRODUCT_CONTEXT);
//   return context;
// };

// export default ProductProvider;
