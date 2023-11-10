// import { useContract, useAddress } from '@thirdweb-dev/react';
// import { createContext, useContext } from 'react';

// const ContractContext = createContext();
// export function ContractContextProvider({ children }) {
//   const address = useAddress();

//   const { contract } = useContract(
//     '0x88F87DBbfD881e26C2B943f36ba49A96D51EA524'
//   );
//   return (
//     <ContractContext.Provider
//       value={{
//         address,
//         contract,
//       }}
//     >
//       {children}
//     </ContractContext.Provider>
//   );
// }
// export const useContractContext = () => useContext(ContractContext);
