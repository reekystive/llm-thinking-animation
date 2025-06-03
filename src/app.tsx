import { FC, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

export const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-row">
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
          className="flex h-36 w-36 items-center justify-center"
        >
          <img
            src={viteLogo}
            className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite logo"
            width="144"
            height="144"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="flex h-36 w-36 items-center justify-center"
        >
          <img
            src={reactLogo}
            className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
            alt="React logo"
            width="144"
            height="144"
          />
        </a>
      </div>
      <h1 className="my-2 text-[3.2em] leading-tight font-bold">Vite + React</h1>
      <div className="py-8 text-center">
        <button
          className="cursor-pointer rounded-lg border border-transparent bg-[#f9f9f9] px-5 py-2.5 text-base font-medium transition-[border-color] duration-[0.25s] hover:border-[#646cff] focus:outline-none active:border-[#646cff] dark:bg-[#1a1a1a]"
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p className="my-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">Click on the Vite and React logos to learn more</p>
    </div>
  );
};
