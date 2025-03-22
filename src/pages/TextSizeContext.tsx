// import React, { createContext, useState, useContext } from 'react';
// // Define the default value with appropriate types
// const TextSizeContext = createContext<{
//   textSize: number;
//   setTextSize: React.Dispatch<React.SetStateAction<number>>;
// }>({
//   textSize: 16, // Default font size
//   setTextSize: () => {}, // Placeholder function (no-op)
// });

// export const TextSizeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [textSize, setTextSize] = useState(16);

//   return (
//     <TextSizeContext.Provider value={{ textSize, setTextSize }}>
//       <div style={{ fontSize: `${textSize}px` }}>{children}</div>
//     </TextSizeContext.Provider>
//   );
// };

// export const useTextSize = () => useContext(TextSizeContext);