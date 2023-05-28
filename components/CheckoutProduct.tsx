import Image from "next/legacy/image";
import { urlFor } from "../sanity.js";
import Currency from "react-currency-formatter";
import { removeFromBasket, addToBasket } from "../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
  items: Product[];
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
  const [desc, setDesc] = useState(false);
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };
  const addItemToBasket = () => {
    dispatch(addToBasket(items[0]));

    toast.success(`${items[0].title} added to basket`, {
      position: "bottom-center",
    });
  };

  console.log(items);

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col justify-start gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold ">
              <span
                className="cursor-pointer text-teal-700"
                onClick={() => removeItemFromBasket()}
              >
                -
              </span>
              {items.length}
              <span
                className="cursor-pointer text-teal-700"
                onClick={() => addItemToBasket()}
              >
                +
              </span>
            </p>
          </div>

          <p
            onClick={() => setDesc(!desc)}
            className="flex cursor-pointer items-end gap-1 text-teal-700 transition-all duration-300 hover:underline"
          >
            Show product details
          </p>
          <span className="sticky inset-0 transition-all duration-300">
            {desc ? items[0]?.description[0].children[0].text : <p> </p>}
          </span>
        </div>

        <div className="mb-6 flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
              currency="HUF"
            />
          </h4>
          <button
            onClick={removeItemFromBasket}
            className="text-teal-700 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
