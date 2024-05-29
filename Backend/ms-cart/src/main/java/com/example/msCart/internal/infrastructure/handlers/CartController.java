package com.example.msCart.internal.infrastructure.handlers;


import com.example.msCart.internal.domain.services.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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


        @PostMapping("/{cartId}/products/{productId}")
        public ResponseEntity<String> addProductToCart(@PathVariable Long cartId, @PathVariable Long productId, @RequestParam Integer quantity) {
                if (cartService.addProductToCart(cartId, productId, quantity) != null) {
                        return ResponseEntity.status(HttpStatus.CREATED).body("Product added to cart successfully");
                } else {
                        return ResponseEntity.notFound().build();
                }
        }

        @DeleteMapping("/{cartId}/products/{productId}")
        public ResponseEntity<String> removeProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
                if (cartService.removeProductFromCart(cartId, productId) != null) {
                        return ResponseEntity.ok("Product removed from cart successfully");
                } else {
                        return ResponseEntity.notFound().build();
                }
        }



}