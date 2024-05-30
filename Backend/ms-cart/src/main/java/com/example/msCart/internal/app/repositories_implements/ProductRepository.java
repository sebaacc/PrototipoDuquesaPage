package com.example.msCart.internal.app.repositories_implements;

import com.example.msCart.internal.domain.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findById(String genre);
}
