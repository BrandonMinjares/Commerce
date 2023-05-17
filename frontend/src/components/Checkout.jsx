import React, {useEffect} from 'react';

/**
 * @return {void}
 */
export default function Checkout() {
    useEffect(() => {
        console.log('get items');
      }, []);
  return (
    <div>Checkout</div>
  );
}
