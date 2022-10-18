import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import menu from '../../constant/menu';
import Snackbar from '@mui/material/Snackbar';
import MenuCard from './Card';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  margin: theme.spacing(2)
}));

const Menu = () => {
  const totalQuantity = useSelector(
    (state: RootState) => state.order.totalQuantity
  );
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (totalQuantity > 5) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [totalQuantity]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message="You have reach the maximum order limit, this order will place by batch upon checkout"
      />

      <Grid container spacing={4}>
        {menu?.drinks?.map((m: any, index: number) => {
          return (
            <Item key={index}>
              <MenuCard data={m} />
            </Item>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Menu;