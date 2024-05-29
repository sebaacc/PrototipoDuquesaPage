package com.example.msCart.internal.domain.services;

import com.example.msCart.internal.domain.models.Cart;


import java.util.List;

public interface ICartService {

    // Método para ver todos los productos que tiene el carrito
   // List<Product> getAllProductsInCart(Long cartId);

    // Método para agregar un producto a un carrito
    Cart addProductToCart(Long cartId, Long productId, Integer quantity);

    // Método para eliminar un producto de un carrito
    Cart removeProductFromCart(Long cartId, Long productId);

    // Método para vaciar un carrito
   // Cart clearCart(Long cartId);

    // Método para calcular el total del carrito
    //double calculateTotalPrice(Long cartId);

}