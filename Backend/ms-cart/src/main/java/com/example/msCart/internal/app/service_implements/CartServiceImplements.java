package com.example.msCart.internal.app.service_implements;

import com.example.msCart.internal.app.repositories_implements.ICartRepository;
import com.example.msCart.internal.app.repositories_implements.ProductRepository;
import com.example.msCart.internal.domain.models.Cart;

import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.domain.services.ICartService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
    public class CartServiceImplements implements ICartService {

    private ICartRepository cartRepository;
    private ProductRepository productRepository;
    // traer product repo


    @Override
    public Cart addProductToCart(Long cartId, Long productId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        if (cart != null && product != null) {
            cartRepository.saveProduct(product, quantity);
            return cartRepository.save(cart);
        }
        return null;
    }

    @Override
    public String removeProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        Long idCart = cart.getCartId();
        Product product = productRepository.findById(productId).orElse(null);
        if (cart != null && product != null) {
            cartRepository.deleteProduct(product);
            return "Deleted" + idCart;
        }
        return null;
    }




}
