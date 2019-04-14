import React, { useState, FunctionComponent, ChangeEvent } from "react";

import { useFetchData } from "./useFetchData";

type TObject = Partial<{ [key: string]: any }>

const useKeyWord = (keyWord: string) => {
  const [keyword, setKeyword] = useState(keyWord);
  const setQuery = (keyWord: string) => setKeyword(keyWord);

  return { keyword, setQuery };
};

let SimpleSearchResult: FunctionComponent;
SimpleSearchResult = () => {
  const {keyword, setQuery} = useKeyWord("react");

  const url = `https://hn.algolia.com/api/v1/search?query=${keyword}`;
  const {data, loading, error} = useFetchData(url, keyword);

  if (error.error) {
    return <p>something wrong, {error.message}</p>;
  }

  return (
    <>
      <input
        value={keyword}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
      />
      {loading ? (
        <span>loading</span>
      ) : (
        <ul>
          {(data as any).hits.map((item: TObject) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { SimpleSearchResult };
