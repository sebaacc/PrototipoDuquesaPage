package com.example.msCart.internal.infrastructure.handlers;


import com.example.msCart.internal.domain.models.Cart;
import com.example.msCart.internal.domain.models.MostAddedProduct;
import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.domain.services.ICartService;
import com.example.msCart.internal.infrastructure.feign.ProductClient;
import com.example.msCart.internal.utils.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cart")
public class CartController {

        @Autowired
        private  ICartService cartService;
        @Autowired
        private  ProductClient productClient;



        @GetMapping("/findCartProducts/{userId}")
        public ResponseEntity<List<Product>> findCartProducts(@PathVariable String userId)
        {
           return ResponseEntity.ok(cartService.getAllProductsInCart(userId));
        }

        @GetMapping("/findMostAddedProducts/{limit}")
        public ResponseEntity<List<MostAddedProduct>> findMostAddedProducts(@PathVariable Integer limit)
        {
                return ResponseEntity.ok(cartService.findMostAddedProducts(limit));
        }

        @PostMapping("/addProductToCart")
        public ResponseEntity addProductToCart(@RequestBody Cart cart) throws BadRequestException {
                cartService.addProductToCart(cart);
                return ResponseEntity.ok("Product added to the cart");
        }


        @DeleteMapping("/removeProductFromCart/{userId}/{productId}")
        public ResponseEntity removeProductFromCart(@PathVariable String userId, @PathVariable String productId) {
                cartService.removeProductFromCart(userId, productId);
                return ResponseEntity.ok("Product removed");
        }

        @DeleteMapping("/clearCart/{userId}")
        public ResponseEntity clearCart(@PathVariable String userId) {
                cartService.clearCart(userId);
                return ResponseEntity.ok("Cart removed");
        }

        @DeleteMapping("/removeProductFromAllCarts/{productId}")
        public ResponseEntity deleteProductFromAllCarts(@PathVariable String productId) {
                cartService.removeProductFromAllCarts(productId);
                return ResponseEntity.ok("Product removed");
        }





}