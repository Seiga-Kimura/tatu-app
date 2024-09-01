import React from 'react';

const UserDetail: React.FC = () => {
  return (
    <div>
      <h1>助けたことリスト</h1>
      <ul>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/path/to/image1.jpg" alt="助けたこと1" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          助けたこと1
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/path/to/image2.jpg" alt="助けたこと2" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          助けたこと2
        </li>
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/path/to/image3.jpg" alt="助けたこと3" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          助けたこと3
        </li>
      </ul>
    </div>
  );
}

export default UserDetail;
