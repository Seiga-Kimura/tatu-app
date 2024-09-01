import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Supabaseクライアントのインポート

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  tableId: number;
  isEmpty: boolean;
  skill1: string;
  skill2: string;
  skill3: string;
  trouble: string;
}

interface Table {
  id: number;
  name: string;
}

interface PairingPayload {
  new: {
    help: number;
    helped: number;
    // 他の必要なフィールドがあればここに追加
  };
  // 他の必要なフィールドがあればここに追加
}

const Home: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [requestVisible, setrequestVisible] = useState(false);

  // SupabaseからテーブルとPersonsのデータを取得
  useEffect(() => {
    const fetchTablesAndPersons = async () => {
      const { data: tablesData, error: tablesError } = await supabase
        .from('tables')
        .select('*');
      
      const { data: personsData, error: personsError } = await supabase
        .from('persons')
        .select('*');

      if (tablesError || personsError) {
        console.error('Error fetching data:', tablesError || personsError);
      } else {
        setTables(tablesData);
        setPersons(
          personsData.map((person: any) => ({
            id: person.id,
            firstName: person.first_name,
            lastName: person.last_name,
            gender: person.gender,
            tableId: person.table_id,
            isEmpty: person.is_empty,
            skill1: person.skill1,
            skill2: person.skill2,
            skill3: person.skill3,
            trouble: person.trouble,
          }))
        );
      }
    };

    fetchTablesAndPersons();
  }, []);

  // pairingテーブルに新しいデータが追加されたときの通知
  useEffect(() => {
    const pairingChannel = supabase
      .channel('pairing-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pairing' }, (payload: PairingPayload) => {
        console.log(payload)
        if (payload.new.help === 74) {
          
          setrequestVisible(true);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(pairingChannel);
    };
  }, []);

  const handleIconClick = (person: Person) => {
    setSelectedPerson(person);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedPerson(null);
  };


  const closerequest = () => {
    setrequestVisible(false);
  };
  

  const closeNotification = () => {
    setNotification(null);
  };



  const handleRequestHelp = async () => {
    if (selectedPerson) {
      const { data, error } = await supabase
        .from('pairing')
        .insert([
          { help: selectedPerson.id, helped: 89 } // helped id を固定
        ]);

      if (error) {
        console.error('Error inserting pairing:', error);
      } else {
        console.log('Help request inserted:', data);
        closePopup();
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-wrap justify-center items-center">
      <div className="absolute top-0 right-0 p-4 flex space-x-4 text-sm">
        <a href="#" className="hover:underline">User:佐藤花子</a>
        <a href="#" className="hover:underline">ID:74</a>
        <a href="#" className="hover:underline">人を探す</a>
        <a href="#" className="hover:underline">会員登録</a>
        <span>/</span>
        <a href="#" className="hover:underline">ログイン</a>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4 text-center">
          {notification}
          <button onClick={closeNotification} className="ml-4 text-sm">閉じる</button>
        </div>
      )}

      {/* TablesとPersonsデータを表示 */}
      {tables.map((table) => (
        <div key={table.id} className="relative m-12">
          {/* テーブル名の表示 */}
          <div className="w-40 h-40 border-2 border-gray-300 flex justify-center items-center">
            <p>{table.name}</p>
          </div>

          {/* テーブルに関連するPersonの表示 */}
          <div className="absolute inset-0">
            {persons
              .filter(person => person.tableId === table.id)
              .map((person, index) => (
                <div
                  key={person.id}
                  className={`w-8 h-8 rounded-full absolute flex justify-center items-center cursor-pointer ${
                    person.tableId === 1 && index === 3
                      ? 'bg-green-500'
                      : person.isEmpty ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                  style={
                    index === 0
                      ? { top: '-2rem', left: 'calc(50% - 1rem)' }
                      : index === 1
                      ? { bottom: '-2rem', left: 'calc(50% - 1rem)' }
                      : index === 2
                      ? { left: '-2rem', top: 'calc(50% - 1rem)' }
                      : { right: '-2rem', top: 'calc(50% - 1rem)' }
                  }
                  onClick={() => handleIconClick(person)}
                >
                  <span role="img" aria-label="user">👤</span>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* ポップアップ */}
      {popupVisible && selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-3/4 bg-white p-8 rounded-lg flex justify-between">
            {selectedPerson.isEmpty ? (
              <div className="text-center w-full">
                <h2 className="text-xl mb-4">この席は空いています</h2>
                <button
                  onClick={closePopup}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  閉じる
                </button>


              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl mb-4">
                    {selectedPerson.lastName} {selectedPerson.firstName} の詳細
                  </h2>
                  <p>ID: {selectedPerson.id}</p>
                  <p>Name: {selectedPerson.lastName} {selectedPerson.firstName}</p>
                  <p>Gender: {selectedPerson.gender}</p>
                  <p>Skill 1: {selectedPerson.skill1}</p>
                  <p>Skill 2: {selectedPerson.skill2}</p>
                  <p>Skill 3: {selectedPerson.skill3}</p>
                  <p>Trouble: {selectedPerson.trouble}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <button
                    onClick={handleRequestHelp}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                  >
                    助けをリクエストする
                  </button>

            {/* "困っていること"ボタンをlocalhostのall_images.txsにリンク */}
            <a
              href="/all_image" // ローカルホストのリンクを指定
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded mb-1"
            >
              解決したことリスト
            </a>

                  <button
                    onClick={closePopup}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    閉じる
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )
     }

{requestVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-3/4 bg-white p-8 rounded-lg flex justify-between">
          <h2 className="text-xl mb-4">小林陽介さんからのリクエストがあります</h2>
    
 
            
          <button
                  onClick={closerequest}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  閉じる
                </button>
        
          </div>
        </div>
      )} 

    </div>
  );
};

export default Home;
