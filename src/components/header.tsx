import React from 'react';

export const Header = () => {
  return (
      <div className="absolute top-0 right-0 p-4 flex space-x-4 text-sm">
        <a href="#" className="hover:underline">人を探す</a>
        <a href="#" className="hover:underline">会員登録</a>
        <span>/</span>
        <a href="#" className="hover:underline">ログイン</a>
      </div>
  );
};




