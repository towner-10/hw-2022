import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const SearchBox = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (query: string) => {
    router.push(`/article/${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-row flex-nowrap justify-center">
      <div className="mb-3 xl:w-96">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(searchQuery);
          }}
        >
          <div className="input-group relative flex flex-row space-x-2 items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter a search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={(e) => onSubmit(searchQuery)}
            />
            <button
              className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition hover:bg-patrick-blue-400 hover:text-cornsilk-400 duration-150 ease-in-out"
              type="button"
              id="button-addon3"
              onClick={() => onSubmit(searchQuery)}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
