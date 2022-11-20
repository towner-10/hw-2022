import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const SearchBox = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = async (query: string) => {
    const howToQuery = query.toLowerCase().startsWith("how to")
      ? query
      : `How to ${query}`;

    let res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/new-guide?prompt=${encodeURIComponent(howToQuery)}`
    );
    let data = await res.json();
    router.push(`/article/${data.id}`);
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
          <div className="input-group relative flex flex-row items-stretch w-full my-4">
            <span className="inline-block p-2 border rounded-l border-black border-r-gray font-medium text-xs whitespace-nowrap ">
              How to
            </span>
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full pr-1.5 pl-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border-black border border-x-0 border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter a search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={(e) => onSubmit(searchQuery)}
            />
            <button
              className="btn inline-block px-6 py-2 border-black border font-medium text-xs leading-tight uppercase rounded-r focus:outline-none focus:ring-0 transition-all hover:border-patrick-blue-400 hover:bg-patrick-blue-400 hover:text-cornsilk-400 duration-150 ease-in-out"
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
