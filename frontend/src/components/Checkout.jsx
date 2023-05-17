import {Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';


const getUserItems = (setItems) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/usersItems`, {
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
    .then((res) => {/*
      for (let i = 0; i < res.length; i++) {
        if (res[i].data.fileImage) {
          const buffer = res[i].data.fileImage.buffer.data;
          const base64String =
          window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
          res[i].data.urlLink = base64String;
        }
      }
      */
      console.log(res);
      setItems(res);
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};
/**
 * @return {void}
 */
export default function Checkout() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserItems(setItems);
    console.log('get items');
  }, []);
  return (
    <div>
      {items.length > 0 &&
            items.map((row, index) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                {row.itemid}
              </Grid>
            ))}


    </div>
  );
}
