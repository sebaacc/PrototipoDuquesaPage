package com.example.msCart.Factory;

import com.example.msCart.internal.domain.models.Cart;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FactoryCartDataTest {

    public static List<Cart> getCarts(){
        List<Cart> carts = new ArrayList<>();
        List<String> images = new ArrayList<>();
        Cart cart1 = new Cart(1234L,"12345678","Torta",2,100.0);
        Cart cart2 = new Cart(5678L,"12345678","Pstre",1,50.0);


        carts.add(cart1);
        carts.add(cart2);
        return carts;
    }

    public static Cart createCart(){
        Cart cart1 = new Cart(1234L,"12345678","Torta",2,100.0);

        return cart1;
    }
}
