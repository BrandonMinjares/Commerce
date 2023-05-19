import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar, Button, CardActionArea, CardContent, CardHeader,
  CardMedia, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, Typography} from '@mui/material';

import './../css/App.css';
// import {useNavigate} from 'react-router-dom';


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
      for (let i = 0; i < res.length; i++) {
        if (res[i].data.fileImage) {
          console.log(res[i].data);
          const buffer = res[i].data.fileImage.buffer.data;
          const byteArray = new Uint8Array(buffer);
          const blob = new Blob([byteArray]);


          const dataURL = URL.createObjectURL(blob);

          res[i].data.urlLink = dataURL;
        }
      }
      console.log(res);
      setItems(res);
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};

const addToCart = (id) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }

  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/insertItem/${id}`, {
    method: 'POST',
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
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};

const Items = () => {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  const handleClickOpen = (row) => {
    const id = row.itemid;
    console.log(row);
    row.data.itemID = row.itemid;
    row.data.userID = row.userid;
    setItem(row.data);
    setOpen(true);
    window.history.pushState(null, '', `product/${id}`); // Change the URL here
  };

  const handleClose = () => {
    setOpen(false);
    window.history.back();
  };
  //   const navigate = useNavigate();

  useEffect(() => {
    getItems(setItems);
  }, []);


  return (
    <div>
      <Grid container spacing={2}>
        {items.length > 0 &&
            items.map((row, index) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                <Card sx={{borderRadius: '10px'}}>
                  <CardActionArea onClick={() =>
                    handleClickOpen(row)}>
                    <CardMedia
                      component="img"
                      style={{maxWidth: '100%',
                      position: 'relative', height: 300}}
                      src={row.data.urlLink}
                      alt={row.data.product}
                    />
                    <Grid container>
                      <Grid item xs={8}>
                        <CardContent>
                          <Typography variant="body2"
                            color="text.secondary" fontSize={'18px'}
                            fontWeight={'bold'}
                          >
                          ${row.data.price}
                          </Typography>
                        </CardContent>
                        <CardContent>
                          <Typography variant="body2" color="text.secondary"
                            fontSize={'18px'}>
                            {row.data.product}
                          </Typography>
                        </CardContent>
                      </Grid>
                      <Grid item xs={4}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{bgcolor: 'red'}} aria-label="recipe">R
                            </Avatar>
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Card>
                <Grid item xs={12} padding={0.5}>
                  <Button autoFocus fullWidth
                    onClick={() => addToCart(row.itemid)}
                    sx={{backgroundColor: 'black', color: 'white',
                      textAlign: 'center'}}
                  >
                            + Add to Cart
                  </Button>
                </Grid>
              </Grid>
            ))}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          maxWidth='md'
          fullWidth
        >
          <DialogTitle id="responsive-dialog-title" textAlign={'center'}>
            {'Marketplace'}
          </DialogTitle>

          <Grid container>
            <Grid item xs={8}>

              <DialogContent>
                <img
                  style={{maxWidth: '100%',
                    maxHeight: 'calc(100vh - 64px)'}}
                    src={item.urlLink}
                    alt='truck'
                />
              </DialogContent>
            </Grid>
            <Grid item xs={4}>
              <DialogContent>
                <DialogContentText sx={{fontSize: '22px'}}>
                  {item.product}
                </DialogContentText>
                <DialogContentText>
                  Category: {item.category}
                </DialogContentText>
                <DialogContentText>
                  Price: ${item.price}
                </DialogContentText>
                <DialogContentText>
                  Condition: {item.condition}
                </DialogContentText>
                <DialogContentText>
                  {item.description}
                </DialogContentText>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                            Message Seller
                  </Button>
                </DialogActions>
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
                      Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Items;
