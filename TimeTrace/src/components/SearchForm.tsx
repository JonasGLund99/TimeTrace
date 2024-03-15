import { useState } from 'react';

interface SearchProps {
  onSubmit: (query: string) => void;
}

export default function Search({ onSubmit }: SearchProps) {
  const [TRE, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(TRE);
    alert(`You searched for '${TRE}'`);
  };

  return (
    <form className = "flex justify-center" onSubmit={handleSubmit}>
        <div>
      <input
        className="border border-gray-700 "
        placeholder='Enter TRE string'
        name="TRE"
        value={TRE}
        onChange={(e) => setQuery(e.target.value)}
        required 
      />
      <button className="bg-blue-900 border border-gray-700 text-stone-50" type="submit">Search</button>
      </div>
    </form>
  );
}
