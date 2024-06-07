package com.example.msCart.internal.domain.services;

import com.example.msCart.internal.domain.models.Cart;
import com.example.msCart.internal.domain.models.MostAddedProduct;
import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.utils.exceptions.BadRequestException;


import java.util.List;

public interface ICartService {

    // Método para ver todos los productos que tiene el carrito
   List<Product> getAllProductsInCart(String clientId);

    // Método para agregar un producto a un carrito
    void addProductToCart(Cart cart) throws BadRequestException;

    // Método para eliminar un producto de un carrito
    void removeProductFromCart(String userId, String productId);

    // Método para vaciar un carrito
    void clearCart(String userId);

    public void removeProductFromAllCarts(String productId);

    List<MostAddedProduct> findMostAddedProducts(Integer limit);

    // Método para calcular el total del carrito
    //double calculateTotalPrice(Long cartId);

}