import {Box, Button, Card, CardContent,
  CardMedia,
  Grid, IconButton, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const checkout = () => {
  console.log('checkout');
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }

  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/checkout`, {
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
      window.location = res.url;
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};

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
              <Grid item key={row.itemid} xs={12} sm={12} md={12}>
                <Card sx={{display: 'flex', padding: 2}}>
                  <CardMedia
                    component="img"
                    alt="Card Image"
                    src={`data:image/png;base64,${row.data.urlLink}`}
                    style={{width: 200, height: 'auto'}}
                  />
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {row.data.product}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {row.data.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ${row.data.price}
                      </Typography>
                    </CardContent>
                    <Box>
                      <IconButton>
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
            Cost
          <Button onClick={() => checkout()}>Checkout</Button>
        </Grid>
      </Grid>

    </div>
  );
}
