package com.example.msCart.internal.domain.services;

import com.example.msCart.internal.domain.models.Cart;


import java.util.List;

public interface ICartService {

    // Método para ver todos los productos que tiene el carrito
   //List<Product> getAllProductsInCart(String clientId);

    // Método para agregar un producto a un carrito
    void addProductToCart(Cart cart);

    // Método para eliminar un producto de un carrito
    void removeProductFromCart(String userId, String productId);

    // Método para vaciar un carrito
    void clearCart(String userId);

    // Método para calcular el total del carrito
    //double calculateTotalPrice(Long cartId);

}