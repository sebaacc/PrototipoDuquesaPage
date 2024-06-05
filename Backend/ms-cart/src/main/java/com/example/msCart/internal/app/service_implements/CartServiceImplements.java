package com.example.msCart.internal.app.service_implements;

import com.example.msCart.internal.app.repositories_implements.ICartRepository;
import com.example.msCart.internal.domain.models.Cart;

import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.domain.services.ICartService;
import com.example.msCart.internal.infrastructure.feign.ProductClient;
import com.example.msCart.internal.utils.exceptions.BadRequestException;
import feign.FeignException;
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


    public void addProductToCart(Cart cart) throws BadRequestException {

        Optional<Cart> posibleCart = cartRepository.findByClientAndProduct(cart.getClient(), cart.getProduct());

        if(posibleCart.isPresent())
        {
            throw new BadRequestException("The user already has that product added to the cart");
        }

        try {
            Boolean isAvailable = productClient.isProductAvailable(cart.getProduct(), cart.getQuantity(), false);
            if (isAvailable) {
                cartRepository.save(cart);
            } else {
                throw new BadRequestException("The amount of products that you want to add is not available");
            }
            //Si Go no nos devuelve un producto, manejamos la exception
        } catch (FeignException.BadRequest e) {
            throw new BadRequestException("Could not find a product");
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


    @Override
    public void removeProductFromAllCarts(String productId)
    {
        cartRepository.deleteByProduct(productId);
    }


}
