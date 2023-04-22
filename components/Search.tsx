import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/legacy/image";
import { urlFor } from "../sanity";

interface Props {
  products: Product[];
  categories: Category[];
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}

const Search = ({
  products,
  setShowSearch,
  categories,
}: Props) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      console.log("error");
    } else {
      setFilteredData(newFilter);
      console.log("success");
    }
  };
  return (
    <div className="relative">
      <input
        type="search"
        x-model="search"
        value={wordEntered}
        onChange={handleFilter}
        placeholder="Search Here..."
        className="w-48 rounded py-3 px-4 font-thin shadow shadow-gray-100 duration-100 focus:shadow-lg focus:shadow-slate-200 focus:outline-none"
      />
      {/* <button
        onClick={() => setShowSearch(false)}
        className="absolute right-3 top-3 z-10"
      >
        X
      </button> */}
      {filteredData.length !== 0 && (
        <div className="absolute z-10 mt-1 rounded-md bg-white shadow-lg">
          {filteredData
            .filter((product) =>
              categories.map((cat) => product.category._ref === cat._id)
            )
            .map((prod) => {
              return (
                <div className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
                  <div className="flex-shrink-0">
                    <div className="relative h-8 w-8">
                      <Image
                        src={urlFor(prod.image[0]).url()}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {prod.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {categories.filter((cat)=>cat._id === prod.category._ref).map((cat)=>cat.title)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;
