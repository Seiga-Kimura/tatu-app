import React from 'react';
import {Header} from "../components/header"

const Home = () => {
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
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
              style={{ top: '-2rem', left: 'calc(50% - 1rem)' }}
            >
              <span role="img" aria-label="user">👤</span>
            </div>

            {/* 下 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
              style={{ bottom: '-2rem', left: 'calc(50% - 1rem)' }}
            >
              <span role="img" aria-label="user">👤</span>
            </div>

            {/* 左 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
              style={{ left: '-2rem', top: 'calc(50% - 1rem)' }}
            >
              <span role="img" aria-label="user">👤</span>
            </div>

            {/* 右 */}
            <div
              className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center"
              style={{ right: '-2rem', top: 'calc(50% - 1rem)' }}
            >
              <span role="img" aria-label="user">👤</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;


