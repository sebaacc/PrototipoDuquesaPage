package com.example.msCart.Factory;

import com.example.msCart.internal.domain.models.Product;

import java.util.ArrayList;
import java.util.List;

public class FactoryProductDataTest {

    public static List<Product> getProducts(){
        List<Product> products = new ArrayList<>();
        List<String> images = new ArrayList<>();
        Product product1 = new Product("abc123", "Torta", 100, "Torta de chocolate", images, 2,"123");
        Product product2 = new Product("abc456", "Postre", 50, "Arroz con leche", images, 1,"456");

        products.add(product1);
        products.add(product2);
        return products;
    }
}
