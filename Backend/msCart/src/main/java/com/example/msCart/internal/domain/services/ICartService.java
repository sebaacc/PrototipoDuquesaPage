package com.example.msCart.internal.domain.services;

import com.example.msCart.internal.domain.models.Cart;
import com.example.msCart.internal.domain.models.Product;


import java.util.List;

public interface ICartService {

    public List<Cart> getCart();

    public void saveProduct(Product prod);

    public void removeProduct(String id);

    public void editProduct (Product prod)

}