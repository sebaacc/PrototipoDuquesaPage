package com.example.msCart.internal.app.service_implements;

import com.example.msCart.internal.app.repositories_implements.ICartRepository;
import com.example.msCart.internal.domain.models.Cart;

import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.domain.services.ICartService;
import com.example.msCart.internal.infrastructure.feign.ProductClient;
import com.example.msCart.internal.utils.exceptions.BadRequestException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
    public class CartServiceImplements implements ICartService {

    private final ICartRepository cartRepository;

    private final ProductClient productClient;

    public CartServiceImplements(ICartRepository cartRepository, ProductClient productClient) {
        this.cartRepository = cartRepository;
        this.productClient = productClient;
    }

    @Override
    public List<Product> getAllProductsInCart(String clientId) {
        List<Cart> cartList = cartRepository.findByClient(clientId);

        List<String> productIdsList = new ArrayList<>();

        for (Cart cart : cartList) {
            productIdsList.add(cart.getProduct());
        }

        // Convierte la lista de IDs en una cadena de IDs separados por comas
        String idsString = String.join(",", productIdsList);

        // Llama al Feign Client con el string de IDs
        List<Product> products = productClient.findMultipleProducts(idsString);

        return products;
    }


    @Override
    public void addProductToCart(Cart cart) throws BadRequestException {

        Boolean isAvailable = productClient.isProductAvailable(cart.getProduct(), cart.getQuantity(), false);
        System.out.println(isAvailable);
        if(isAvailable)
        {
            cartRepository.save(cart);
        }
        else
        {
           throw new BadRequestException("The amount of products that you want to add is not available");
        }

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
