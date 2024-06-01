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

        @Autowired
        private  ICartService cartService;
        @Autowired
        private  ProductClient productClient;


        @GetMapping("/category/{id}")
        public ResponseEntity<Object> getCategory(@PathVariable String id) {
                System.out.println("Received request to get category with ID: " + id); // Registro de depuración
                Object response = productClient.getCategoryById(id);
                System.out.println("Response from ProductClient: " + response); // Registro de depuración
                return ResponseEntity.ok(response);
        }

        @PostMapping("/addProductToCart")
        public ResponseEntity addProductToCart(@RequestBody Cart cart) {
                cartService.addProductToCart(cart);
                return ResponseEntity.ok("Product add to cart");
        }

        @PostMapping("/addCategory")
        public ResponseEntity<String> addCategory(@RequestBody Object category) {

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