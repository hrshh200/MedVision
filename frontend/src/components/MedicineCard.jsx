import React, { useState } from 'react';
import { Pill, Package, ShoppingCart } from 'lucide-react';
import CartButton from './CartButton';

const MedicineCard = ({ name, manufacturer, dosage, price, stock, type, onAddToCart }) => {

  const [amountbutton, setamountButton] = useState(true);
  const [medcount, setMedCount] = useState(0);
  const [addcart, setAddCart] = useState(false);

  const addmedicine = () => {
    setamountButton(false);
    setMedCount(medcount + 1);
  }

  const amountincrease = () => {
    setMedCount(medcount + 1);
  }

  const amountdecrease = () => {
    setMedCount(medcount - 1);
  }
  
  const handleaddtocart = () =>{
    console.log(`${name} added to cart with quantity ${medcount} price is ${price* medcount}`);
    setAddCart(true);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Pill className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
        </div>
        <p className="text-sm text-gray-600">{manufacturer}</p>
        <div className="flex items-center gap-2 mt-2">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{dosage} • {type}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-bold text-blue-600">${price}</div>
          <div className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        {amountbutton ? (
          <button
            // onClick={stock > 0 ? onAddToCart : undefined}
            onClick={addmedicine}
            disabled={stock === 0}
            className={`mt-3 w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium
            transform transition-all duration-200
            ${stock > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 hover:scale-[1.02]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        ) : (
          <div className="mt-3 w-full flex items-center justify-evenly  py-2 px-4">
            <button
              onClick={amountdecrease}
              disabled={medcount === 0}
              className={`py-2 px-4 rounded-lg text-sm font-medium 
      transform transition-all duration-200 
      ${medcount > 0
                  ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              -
            </button>

            <div className="text-center text-sm font-medium text-gray-700">
              {medcount}
            </div>

            <button
              onClick={amountincrease}
              disabled={stock === 0}
              className={`py-2 px-4 rounded-lg text-sm font-medium 
      transform transition-all duration-200 
      ${stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              +
            </button>
            <button
              onClick={()=>handleaddtocart()}
              disabled={stock === 0}
              className={`py-2 px-4 rounded-lg text-sm font-medium 
      transform transition-all duration-200 
      ${stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
  
               Add to cart
            </button>
            {addcart && <CartButton name={name} quantity={medcount} price={price }/>}
          </div>

        )}
      </div>
    </div>
  );
};

export default MedicineCard;