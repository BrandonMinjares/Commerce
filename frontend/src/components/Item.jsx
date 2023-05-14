import {Card, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';

const getItem = (setItem) => {
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
      setItem(res);
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};

const Item = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    getItem(setItem);
  }, []);

  return (
    <div>
      {item.length > 0 &&
            item.map((row) => (
              <Grid item key={row.itemid} xs={12} sm={6} md={4}>
                <Card>
                  <img src={row.data.imageUrl} alt="cute puppy" />
                  {row.data.description}
                </Card>
              </Grid>

            ))}
    </div>
  );
};

export default Item;
