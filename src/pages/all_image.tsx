/*
"use client";

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Image from 'next/image';


export default function AllImagesPage() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Supabaseストレージ内のファイル一覧を取得
        const { data, error } = await supabase
          .storage
          .from('image_upload_kodaschool')
          .list();

        if (error) {
          console.error('Error fetching image list:', error);
          return;
        }

        if (data) {
          // 画像ごとの公開URLを取得
          const urls = data.map(file => {
            const { data: { publicUrl } } = supabase
              .storage
              .from('image_upload_kodaschool')
              .getPublicUrl(file.name);
            return publicUrl;
          });
          
          // 取得したURLをステートにセット
          setImageUrls(urls);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="flex flex-col items-center bg-gray-800 text-gray-200 p-24 min-h-screen">
      <h1 className="text-5xl font-bold mb-10">All Uploaded Images</h1>

      <div className="grid grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="p-2 bg-gray-700 rounded-lg">
            <Image
              src={url}
              alt={`Uploaded Image ${index + 1}`}
              width={150}
              height={150}
              className="object-cover rounded-lg border border-gray-300"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
  */

"use client";

import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Supabaseクライアントをインポート

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

interface Pairing {
  id: number;
  help: number;
  helped: number;
}

const AllImagePage: React.FC = () => {
  const [troubles, setTroubles] = useState<string[]>([]);
  // トラブルに対応する画像URLのマッピング
  const imageMap: { [key: string]: string } = {
    '国語': 'https://larwwujxqqdbwulkghcc.supabase.co/storage/v1/object/public/image_upload_kodaschool/a3b92a45-c1f8-4cbc-aacc-550a0d7c17c9.png',
    '数学': 'https://larwwujxqqdbwulkghcc.supabase.co/storage/v1/object/public/image_upload_kodaschool/f8de1869-cfb1-40a8-b348-f5fde268e400.png',
    '化学': 'https://larwwujxqqdbwulkghcc.supabase.co/storage/v1/object/public/image_upload_kodaschool/a31b1210-718a-49fd-b58b-cb10251daae8.png',
    '物理': 'https://larwwujxqqdbwulkghcc.supabase.co/storage/v1/object/public/image_upload_kodaschool/7a32f34e-61c7-4343-a544-4ee7aeca3b10.png',
    '英語': 'https://larwwujxqqdbwulkghcc.supabase.co/storage/v1/object/public/image_upload_kodaschool/c16dcc57-e63e-4cf6-a4f5-bc59d377f079.png',
    'プログラミング': 'https://larwwujxqqdbwulkghcc.supabase.co/storage/v1/object/public/image_upload_kodaschool/566c4396-c2f5-446a-bdbc-1518f753b841.png',
  };

  useEffect(() => {
    const fetchTroubles = async () => {
      try {
        // Step 1: Pairingテーブルからhelpが83のレコードを取得
        const { data: pairingData, error: pairingError } = await supabase
          .from('pairing')
          .select('helped')
          .eq('help', 74);

        if (pairingError) {
          console.error('Error fetching pairing data:', pairingError);
          return;
        }

        if (!pairingData || pairingData.length === 0) {
          console.log('No pairing data found.');
          return;
        }

        // Step 2: Personテーブルから、helpedに対応するtroubleを取得
        const helpedIds = pairingData.map((pair: { helped: number }) => pair.helped);

        const { data: personsData, error: personsError } = await supabase
          .from('persons')
          .select('trouble')
          .in('id', helpedIds);

        if (personsError) {
          console.error('Error fetching persons data:', personsError);
          return;
        }

        if (personsData) {
          const troublesList = personsData.map((person: { trouble: string }) => person.trouble);
          setTroubles(troublesList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTroubles();
  }, []);

  return (
    <main className="flex flex-col items-center bg-gray-800 text-gray-200 p-24 min-h-screen">
      <h1 className="text-5xl font-bold mb-10">解決したことリスト</h1>
      <ul className="space-y-4">
      {troubles.map((trouble, index) => (
          <li
            key={index}
            className="flex items-center bg-gray-700 rounded-lg border border-gray-300 p-4"
          >
            {/* 指定された画像URLを表示 */}
            <img
              src={imageMap[trouble]}
              alt={`Image for ${trouble}`}
              className="w-16 h-16 rounded-md mr-4 object-cover"
            />
            {/* Trouble テキスト */}
            <span>{trouble}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AllImagePage;

