import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar, Button, CardActions, CardContent, CardHeader,
  CardMedia, Collapse, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, Typography} from '@mui/material';

import './../css/App.css';
// import {useNavigate} from 'react-router-dom';

import truck from './../images/truck.f5b5065b.jpg';

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
          const bufferData = (res[i].data.fileImage.buffer.data);
          const mimetype = (res[i].data.fileImage.mimetype);
          console.log(mimetype);
          const blob = new Blob([bufferData], {type: mimetype});
          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl);
          res[i].data.imageUrl = imageUrl;
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


const Items = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    window.history.pushState(null, '', `product/${id}`); // Change the URL here
  };

  const handleClose = () => {
    setOpen(false);
    window.history.back();
  };
  const [items, setItems] = useState([]);
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
                <Card onClick={() => handleClickOpen(row.itemid)}>
                  <CardMedia
                    component="img"
                    src={row.data.imageUrl}
                    alt="Paella dish"
                  />
                  <CardHeader
                    avatar={
                      <Avatar sx={{bgcolor: 'red'}} aria-label="recipe">R
                      </Avatar>
                    }
                    title={row.data.name}
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {row.data.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                  </CardActions>
                  <Collapse timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                  maxWidth='md'
                  fullWidth
                >
                  <DialogTitle id="responsive-dialog-title">
                    {'Use Googles location service?'}
                  </DialogTitle>
                  <Grid container>
                    <Grid item xs={8}>
                      <DialogContent>
                        <img
                          style={{maxWidth: '100%',
                            maxHeight: 'calc(100vh - 64px)'}}
                          src={truck}
                          alt='truck'
                        />
                      </DialogContent>
                    </Grid>
                    <Grid item xs={4}>
                      <DialogContent>
                        <DialogContentText>
                          <h3>{row.data.product}</h3>
                        </DialogContentText>
                        <DialogContentText>
                          <h4>${row.data.price}</h4>
                        </DialogContentText>
                        <DialogContentText>
                          {row.data.category}
                        </DialogContentText>
                        <DialogContentText>
                          {row.data.description}
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

            ))}
      </Grid>
    </div>
  );
};

export default Items;
