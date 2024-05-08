import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = import.meta.env.VITE_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(e: { preventDefault: () => void }) {
    e.preventDefault();

    const url = import.meta.env.VITE_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        datetime,
        description,
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('results: ', json);
      });
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
          {transactions.length > 0 &&
            transactions.map((transaction: any) => (
              <li key={transaction.id} className='px-6 py-4'>
                <div className='flex justify-between'>
                  <span className='font-semibold text-lg'>
                    {transaction.name}
                  </span>
                  <span className='text-red-600 text-xl'>
                    - {transaction.price}
                  </span>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-500 text-left'>
                    {transaction.description}
                  </p>
                  <span className='text-xs text-gray-500'>
                    {transaction.datetime}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
