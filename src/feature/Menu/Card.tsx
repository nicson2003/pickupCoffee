import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { useDispatch } from 'react-redux';
import { addItem, } from '../../store/order';

const MenuCard = (props: any) => {
  const {data} = props;
  const dispatch = useDispatch();

  return (
    <Card sx={{ minWidth: 350, maxWidth: 400 }}>
      <CardActionArea
        onClick={() => {
          dispatch(addItem(data));
        }}
      >
        <CardMedia component="img" image={data?.image} alt="images" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${data?.name} | ${data?.price}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button autoCapitalize="false" size="small" color="success">
          Order
        </Button>
      </CardActions>
    </Card>
  );
}

export default MenuCard;