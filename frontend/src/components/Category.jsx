import * as React from 'react';
// import Link from '@mui/material/Link';

import {Stack} from '@mui/material';
import Item from './Item';

/**
 * @return {void}
 */
export default function Category() {
  return (
    <Stack direction="row" spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
};
