import React, {useEffect, useState} from 'react';


const getItems = (setItems) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/item`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('notok');
        throw response;
      }
      return response.json();
    })
    .then((res) => {
      setItems(res);
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};


const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems(setItems);
  }, []);

  return (
    <div>
            items

      {items.length > 0 &&
            items.map((row) => (
              <div key={row.itemid}>
                {row.data.name}
              </div>
            ))}
    </div>
  );
};

export default Items;
