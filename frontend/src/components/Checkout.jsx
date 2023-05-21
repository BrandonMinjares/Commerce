import {Box, Button, Card, CardContent,
  CardMedia,
  Grid, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';

const checkout = () => {
  // console.log('checkout');
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


/**
 * @return {void}
 */
export default function Checkout() {
  const [items, setItems] = useState([]);
  const [cost, setCost] = useState(0);
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
        let totalCost = 0;
        for (let i = 0; i < res.length; i++) {
          if (res[i].data.fileImage) {
            // console.log(res[i].data);
            const buffer = res[i].data.fileImage.buffer.data;
            const byteArray = new Uint8Array(buffer);
            const blob = new Blob([byteArray]);
            const dataURL = URL.createObjectURL(blob);
            res[i].data.urlLink = dataURL;
          }
          totalCost += parseInt(res[i].data.price);
        }
        setCost(totalCost);
        setItems(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserItems(setItems);
    console.log('get items');
  }, []);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography textAlign={'center'} padding={2}
            fontSize={38}>
            Shopping Cart
          </Typography>
        </Grid>

        <Grid item xs={8} sm={8} md={8} lg={8}>
          {items.length > 0 &&
            items.map((row) => (
              <Grid item key={row.itemid} xs={12} sm={12} md={12}>
                <Card sx={{display: 'flex', padding: 2}}>
                  <CardMedia
                    component="img"
                    alt="Card Image"
                    src={row.data.urlLink}
                    style={{width: 300, height: 'auto'}}
                  />
                  <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent>
                      <Typography variant="h4" component="h2">
                        {row.data.product}
                      </Typography>
                      <Typography variant="h5" color="textSecondary">
                        ${row.data.price}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Typography
            textAlign={'center'}
            sx={{color: 'black'}}
            fontSize={28}>Subtotal ${cost}
          </Typography>
          <Button
            padding={2}
            color='primary'
            type="submit"
            aria-label='Create'
            fullWidth
            variant="contained"
            onClick={() => checkout()}>
          Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
