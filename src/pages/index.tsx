import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // 先ほど作成したSupabaseクライアントをインポート

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  tableId: number;
}

interface Table {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
   

    // Personsデータを取得
    const fetchPersons = async () => {
      const { data: personsData, error: personsError } = await supabase
        .from('persons')
        .select('*');

      if (personsError) {
        console.error(personsError);
      } else {
        console.log(personsData);
        setPersons(
          personsData.map((person: any) => ({
            id: person.id,
            firstName: person.first_name,
            lastName: person.last_name,
            gender: person.gender,
            tableId: person.table_id,
          }))
        );
      }
    };
   
    fetchPersons();
  }, []);

  const handleIconClick = (person: Person) => {
    setSelectedPerson(person);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedTable(null);
    setSelectedPerson(null);
  };

  return (
    <div className="relative min-h-screen flex flex-wrap justify-center items-center">
      {/* ヘッダー */}
      <div className="absolute top-0 right-0 p-4 flex space-x-4 text-sm">
        <a href="#" className="hover:underline">人を探す</a>
        <a href="#" className="hover:underline">会員登録</a>
        <span>/</span>
        <a href="#" className="hover:underline">ログイン</a>
      </div>

      {/* テーブルと椅子 */}
        <div className="relative m-12">
          {/* テーブル */}
          <div className="w-40 h-40 border-2 border-gray-300 flex justify-center items-center">
            <p>test</p>
          </div>

          {/* 椅子とユーザーアイコン */}
          <div className="absolute inset-0">
            {persons
              //.filter(person => person.tableId === table.id)
              .map((person, index) => (
                <div
                  key={person.id}
                  className="w-8 h-8 bg-gray-200 rounded-full absolute flex justify-center items-center cursor-pointer"
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
                  <span role="img" aria-label="user">
                    👤{index + 1}
                  </span>
                </div>
              ))}
          </div>
        </div>

      {/* ポップアップ */}
      {popupVisible && selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="w-full h-1/2 bg-white p-8 rounded-t-lg">
            <h2 className="text-xl mb-4">
              Table {selectedTable?.name} - {selectedPerson.lastName} {selectedPerson.firstName}'s Details
            </h2>
            <p>Number: {selectedPerson.id}</p>
            <p>Name: {selectedPerson.lastName} {selectedPerson.firstName}</p>
            <p>Gender: {selectedPerson.gender}</p>
            <button
              onClick={closePopup}
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
