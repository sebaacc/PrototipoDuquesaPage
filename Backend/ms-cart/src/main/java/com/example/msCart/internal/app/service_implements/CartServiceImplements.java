package com.example.msCart.internal.app.service_implements;

import com.example.msCart.internal.app.repositories_implements.ICartRepository;
import com.example.msCart.internal.domain.models.Cart;

import com.example.msCart.internal.domain.services.ICartService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
    public class CartServiceImplements implements ICartService {

    private final ICartRepository cartRepository;

    public CartServiceImplements(ICartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }
    /*  @Override
    public List<Product> getAllProductsInCart(String clientId) {
        return cartRepository.findByClientId(clientId);
    }
*/

    @Override
    public void addProductToCart(Cart cart) {
        cartRepository.save(cart);

    }

    @Override
    @Transactional
    public void removeProductFromCart(String userId, String productId) {
        Optional<Cart> cart = cartRepository.findByClientAndProduct(userId, productId);
        if (cart.isPresent()) {
            cartRepository.deleteByClientAndProduct(userId, productId);
        }

    }

    @Override
    @Transactional
    public void clearCart(String userId) {
        cartRepository.deleteByClient(userId);

    }


}
