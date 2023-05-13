import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Grid} from '@mui/material';

import './../css/App.css';

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
          const buffer = (res[i].data.fileImage.buffer.data);
          const mimetype = (res[i].data.fileImage.buffer.mimetype);
          const blob = new Blob([buffer], {type: mimetype});
          const imageUrl = URL.createObjectURL(blob);
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems(setItems);
  }, []);


  return (
    <Grid container spacing={2}>
      {items.length > 0 &&
            items.map((row) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    src={row.data.imageUrl}
                    alt="Product Image"
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                  <CardHeader
                    title={row.data.product}
                    avatar={
                      <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">R
                      </Avatar>
                    }
                  />
                </Card>
              </Grid>

            ))}
    </Grid>
  );
};

export default Items;
