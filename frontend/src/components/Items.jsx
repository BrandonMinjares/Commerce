import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid} from '@mui/material';

import './../css/App.css';
import {Link} from 'react-router-dom';
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [items, setItems] = useState([]);
  //   const navigate = useNavigate();

  useEffect(() => {
    getItems(setItems);
  }, []);


  return (
    <Grid container spacing={2}>
      {items.length > 0 &&
            items.map((row) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                <Link to={`product/${row.itemid}`}>
                  <Card>
                    <img src={row.data.imageUrl}
                      onClick={handleClickOpen}
                      alt="cute puppy" />
                  </Card>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {'Use Googles location service?'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
            location data to Google, even when no apps are running.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
            Disagree
                      </Button>
                      <Button onClick={handleClose} autoFocus>
            Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Link>
              </Grid>

            ))}
    </Grid>
  );
};

export default Items;
