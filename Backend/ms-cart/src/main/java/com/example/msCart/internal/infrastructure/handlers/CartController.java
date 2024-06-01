package com.example.msCart.internal.infrastructure.handlers;


import com.example.msCart.internal.domain.models.Cart;
import com.example.msCart.internal.domain.models.Category;
import com.example.msCart.internal.domain.services.ICartService;
import com.example.msCart.internal.infrastructure.feign.ProductClient;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/cart")
public class CartController {

        private final ICartService cartService;
        private final ProductClient productClient;

        @Autowired
        public CartController(ICartService cartService, ProductClient productClient) {
                this.cartService = cartService;
                this.productClient = productClient;
        }


        @PostMapping("/addProductToCart")
        public ResponseEntity addProductToCart(@RequestBody Cart cart) {
                cartService.addProductToCart(cart);
                return ResponseEntity.ok("Product add to cart");
        }

        @PostMapping("/addCategory")
        public ResponseEntity<String> addCategory(@RequestBody Category category) {
                if (category == null || category.getName() == null) {
                        return ResponseEntity.badRequest().body("Category or category name cannot be null");
                }

                ResponseEntity<Category> response = productClient.saveCategory(category);
                return ResponseEntity.ok("Category added");
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