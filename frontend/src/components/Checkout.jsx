import {Grid, Typography} from '@mui/material';
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
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        if (res[i].data.fileImage) {
          const buffer = res[i].data.fileImage.buffer.data;
          const base64String =
          window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
          res[i].data.urlLink = base64String;
        }
      }
      setItems(res);
    })
    .catch((error) => {
      console.log(error);
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography textAlign={'center'} fontSize={28}>
            Shopping Cart
          </Typography>
        </Grid>

        <Grid item xs={8} sm={8} md={8} lg={8}>
          {items.length > 0 &&
            items.map((row, index) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                <img src={`data:image/png;base64,${row.data.urlLink}`}
                  alt="Paella dish"/>
                {row.data.product}
                {row.data.description}
              </Grid>
            ))}
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
            Cost
        </Grid>
      </Grid>

    </div>
  );
}
