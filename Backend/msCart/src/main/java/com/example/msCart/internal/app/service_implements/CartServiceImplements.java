package com.example.msCart.internal.app.service_implements;

import com.example.msCart.internal.app.repositories_implements.ICartRepository;
import com.example.msCart.internal.domain.models.Cart;

import com.example.msCart.internal.domain.models.Product;
import com.example.msCart.internal.domain.services.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
    public class CartServiceImplements implements ICartService {

    @Autowired
    private ICartRepository cartRepository;

    @Override
    public List<Cart> getCart() {
        return null;
    }

    @Override
    public void saveProduct(Product prod) {

    }

    public void removeProduct(String id){
            this.cartRepository.deleteById(id);
    }

    @Override
    public void editProduct(Product prod) {

    }

    public void addProduct(Cart cart){
            this.cartRepository.save(cart);
    }


}
