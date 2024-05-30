package com.example.msCart.internal.infrastructure.handlers;


import com.example.msCart.internal.domain.models.Cart;
import com.example.msCart.internal.domain.services.ICartService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/cart")
public class CartController {

        private final ICartService cartService;

        @Autowired
        public CartController(ICartService cartService) {
                this.cartService = cartService;
        }


        @PostMapping("/addProductToCart")
        public ResponseEntity addProductToCart(@RequestBody Cart cart) {
                cartService.addProductToCart(cart);
                return ResponseEntity.ok("Product add to cart");
        }

        @DeleteMapping("/removeProductFromCart/{userId}/{productId}")
        public ResponseEntity removeProductFromCart(@PathVariable String userId, @PathVariable String productId) {
                cartService.removeProductFromCart(userId, productId);
                return ResponseEntity.ok("Product remove");
        }

        @DeleteMapping("/clearCart/{userId}")
        public ResponseEntity clearCart(@PathVariable String userId) {
                cartService.clearCart(userId);
                return ResponseEntity.ok("Cart remove");
        }



}