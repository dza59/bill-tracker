import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  function addNewTransaction(e: { preventDefault: () => void }) {
    e.preventDefault();
    // TODO: Call BE API to add new transaction

    const url = import.meta.env.VITE_APP_API_URL + '/transaction';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        datetime,
        description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen w-full'>
      <div>
        <h1 className='text-2xl font-semibold'>$400</h1>
      </div>

      <form
        className='flex flex-col gap-4 p-4 w-1/2 items-center'
        onSubmit={addNewTransaction}
      >
        <div className='flex flex-col gap-2 w-full'>
          <input
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            placeholder='Enter Amount'
            className='p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full'
          />
          <input
            type='datetime-local'
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className='p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full'
          />
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            className='p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          Add
        </button>
      </form>

      <div className='transactions bg-gray-100 p-4'>
        <ul className='bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm'>
          <li className='px-6 py-4'>
            <div className='flex justify-between'>
              <span className='font-semibold text-lg'>List Item 1</span>
              <span className='text-green-600 text-xl'>+$500</span>
            </div>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-500 text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing eli
              </p>
              <span className='text-xs text-gray-500'>2022-01-01 15:45</span>
            </div>
          </li>
          <li className='px-6 py-4'>
            <div className='flex justify-between'>
              <span className='font-semibold text-lg'>List Item 2</span>
              <span className='text-red-500 text-xl'>-$100</span>
            </div>
            <div className='mt-4 flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-500 text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing eli
              </p>
              <span className='text-xs text-gray-500'>2022-01-01 15:45</span>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default App;
