import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
        if (res[i].data.fileImage.buffer.data) {
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
                <img src = {row.data.imageUrl} alt={row.data.imageUrl}></img>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={row.data.name}
                    subheader="September 14, 2016"
                  />
                  <CardMedia
                    component="img"
                    src={row.data.imageUrl}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
            aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep sk
                      </Typography>
                      <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
                      </Typography>
                      <Typography>
            Set aside off of the heat to let
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

            ))}
    </Grid>
  );
};

export default Items;
