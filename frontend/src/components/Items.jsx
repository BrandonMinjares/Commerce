import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar, Button, CardActionArea, CardHeader,
  CardMedia, Dialog, DialogContent,
  DialogContentText, DialogTitle, Grid} from '@mui/material';

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
          // console.log(res[i].data);
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
            items.map((row) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                <Card sx={{borderRadius: '10px'}}>
                  <CardActionArea>
                    <CardMedia
                      onClick={() =>
                        handleClickOpen(row)}
                      component="img"
                      style={{maxWidth: '100%',
                        position: 'relative', height: 300}}
                      src={row.data.urlLink}
                      alt={row.data.product}
                    />
                  </CardActionArea>
                  <CardHeader
                    title={row.data.product}
                    subheader={'$' + row.data.price}
                    avatar={
                      <Avatar sx={{bgcolor: 'red'}} aria-label="recipe">R
                      </Avatar>
                    }
                  />
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
          <DialogTitle id="responsive-dialog-title"
            textAlign={'center'} fontSize={28}>
            {'Marketplace'}
          </DialogTitle>
          <Grid container>
            <Grid item xs={6}>
              <DialogContent>
                <img
                  style={{maxWidth: '100%', height: 400}}
                  src={item.urlLink}
                  alt='item'
                />
              </DialogContent>
            </Grid>
            <Grid item xs={6}>
              <DialogContent>
                <DialogContentText
                  sx={{fontSize: '26px'}}>
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
                  Description: {item.description}
                </DialogContentText>
                <Button
                  color='primary'
                  aria-label='Create'
                  sx={{mt: 3, mb: 2}}
                  variant="contained"
                  autoFocus onClick={handleClose}>Close</Button>
              </DialogContent>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </div>
  );
};

export default Items;
