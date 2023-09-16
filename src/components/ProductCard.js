import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  //console.log(product)
  return (
    <Grid item  xs={6} md={3}>
    <Card className="card"  >
      <CardMedia
      component="img"
        sx={{ height: 140 }}
        src={product.image}
      />
      <CardContent>
      <Typography gutterBottom variant="p" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
        ${product.cost} 
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions className = "card-actions">
        <Button className = "card-button" fullWidth onClick={()=>{handleAddToCart(product._id)}} id={product.id}>ADD TO CART</Button>        
      </CardActions>
    </Card>
    </Grid>
  );
};

export default ProductCard;
