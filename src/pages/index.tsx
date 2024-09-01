
// import React from 'react';
// import {Header} from "../components/header"

// const Home = () => {
//   return (
//     <div className="relative min-h-screen flex flex-wrap justify-center items-center">
//       <Header />

//       {/* テーブルと椅子 */}
//       {Array.from({ length: 6 }).map((_, index) => (
//         <div key={index} className="relative m-12">
//           {/* テーブル */}
//           <div className="w-40 h-40 border-2 border-gray-300 flex justify-center items-center">
//             <p>Table {index + 1}</p>
//           </div>

//           {/* 椅子とユーザーアイコン */}
//           <div className="absolute inset-0">
//             {/* 上 */}
//             <div
//               className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
//               style={{ top: '-2rem', left: 'calc(50% - 1rem)' }}
//             >
//               <span role="img" aria-label="user">👤</span>
//             </div>

//             {/* 下 */}
//             <div
//               className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
//               style={{ bottom: '-2rem', left: 'calc(50% - 1rem)' }}
//             >
//               <span role="img" aria-label="user">👤</span>
//             </div>

//             {/* 左 */}
//             <div
//               className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
//               style={{ left: '-2rem', top: 'calc(50% - 1rem)' }}
//             >
//               <span role="img" aria-label="user">👤</span>
//             </div>

//             {/* 右 */}
//             <div
//               className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
//               style={{ right: '-2rem', top: 'calc(50% - 1rem)' }}
//             >
//               <span role="img" aria-label="user">👤</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import { Header } from "../components/header";

const Home = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleIconClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="relative min-h-screen flex flex-wrap justify-center items-center">
      <Header />

      {/* テーブルと椅子 */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="relative m-12">
          {/* テーブル */}
          <div className="w-40 h-40 border-2 border-gray-300 flex justify-center items-center">
            <p>Table {index + 1}</p>
          </div>

          {/* 椅子とユーザーアイコン */}
          <div className="absolute inset-0">
            {/* 上 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center cursor-pointer"
              style={{ top: '-2rem', left: 'calc(50% - 1rem)' }}
              onClick={handleIconClick}
            >
              <span role="img" aria-label="user">👤</span>
            </div>

            {/* 下 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center cursor-pointer"
              style={{ bottom: '-2rem', left: 'calc(50% - 1rem)' }}
              onClick={handleIconClick}
            >
              <span role="img" aria-label="user">👤</span>
            </div>

            {/* 左 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center cursor-pointer"
              style={{ left: '-2rem', top: 'calc(50% - 1rem)' }}
              onClick={handleIconClick}
            >
              <span role="img" aria-label="user">👤</span>
            </div>

            {/* 右 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center cursor-pointer"
              style={{ right: '-2rem', top: 'calc(50% - 1rem)' }}
              onClick={handleIconClick}
            >
              <span role="img" aria-label="user">👤</span>
            </div>
          </div>
        </div>
      ))}

      {/* ポップアップ */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded">
            <p>ここにポップアップの中身が入ります。</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;





