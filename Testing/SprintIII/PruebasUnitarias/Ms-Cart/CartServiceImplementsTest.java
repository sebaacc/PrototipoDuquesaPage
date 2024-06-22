package com.example.msCart;

import com.example.msCart.Factory.FactoryCartDataTest;
import com.example.msCart.Factory.FactoryProductDataTest;
import com.example.msCart.internal.app.repositories_implements.ICartRepository;
import com.example.msCart.internal.app.service_implements.CartServiceImplements;
import com.example.msCart.internal.domain.models.Cart;
import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.infrastructure.feign.ProductClient;
import com.example.msCart.internal.utils.exceptions.BadRequestException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
public class CartServiceImplementsTest {

    private String clientId = "12345678";
    private String productId = "zyw012";

    @InjectMocks
    CartServiceImplements cartServiceImplements;

    @Mock
    ICartRepository cartRepository;

    @Mock
    ProductClient productClient;

    @Test
    void mustGetAllProductsInCart(){
        List<Product> product = FactoryProductDataTest.getProducts();
        List<Cart> cart = FactoryCartDataTest.getCarts();

        List<String> productIds = cart.stream()
                .map(Cart::getProduct)
                .collect(Collectors.toList());
        String productIdsString = String.join(",", productIds);

        Mockito.when(cartRepository.findByClient(clientId)).thenReturn(cart);
        Mockito.when(productClient.findMultipleProducts(productIdsString)).thenReturn(product);

        List<Product> productsList = cartServiceImplements.getAllProductsInCart(clientId);
        assertEquals(productsList, product);
    }

    @Test
    void mustNotAddProductToCart(){
        Cart cart = FactoryCartDataTest.createCart();

        Mockito.when(cartRepository.findByClientAndProduct(clientId, productId)).thenReturn(Optional.of(cart));
        Assertions.assertThrows(BadRequestException.class, () -> cartServiceImplements.addProductToCart(cart));

    }

    @Test
    void mustAddProductToCart() throws BadRequestException {
        Cart cart = FactoryCartDataTest.createCart();

        Mockito.when(cartRepository.findByClientAndProduct(clientId, productId)).thenReturn(Optional.empty());
        Mockito.when(productClient.isProductAvailable(cart.getProduct(), cart.getQuantity(), false)).thenReturn(true);

        cartServiceImplements.addProductToCart(cart);
        Mockito.verify(cartRepository).save(Mockito.any(Cart.class));
    }

    @Test
    void mustNotAddProductToCartIfThereIsNotStock() {
        Cart cart = FactoryCartDataTest.createCart();

        Mockito.when(cartRepository.findByClientAndProduct(clientId, productId)).thenReturn(Optional.empty());
        Mockito.when(productClient.isProductAvailable(cart.getProduct(), cart.getQuantity(), false)).thenReturn(false);

        Assertions.assertThrows(BadRequestException.class, () -> cartServiceImplements.addProductToCart(cart));
    }

    @Test
    void mustRemoveAProductFromTheCart() {
        Cart cart = FactoryCartDataTest.createCart();

        Mockito.when(cartRepository.findByClientAndProduct(cart.getClient(),cart.getProduct())).thenReturn(Optional.of(cart));

        cartServiceImplements.removeProductFromCart(cart.getClient(),cart.getProduct());
        Mockito.verify(cartRepository).deleteByClientAndProduct(cart.getClient(), cart.getProduct());
    }
}
