import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      if (contract) {
        const memos = await contract.getMemos();
        setMemos(memos);
      }
    };
    fetchMemos();
  }, [contract]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-4xl text-center font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-balck">Messages</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo) => (
            <tr key={Math.random()} className="bg-gray-100">
              <td className="border px-4 py-2">{memo.from}</td>
              <td className="border px-4 py-2">
                {new Date(memo.timestamp * 1000).toLocaleString()}
              </td>
              <td className="border px-4 py-2">{memo.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memos;
