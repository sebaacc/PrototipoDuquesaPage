package com.example.msCart.internal.app.repositories_implements;

import com.example.msCart.internal.domain.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByClient(String clientId);

    Optional<Cart> findByClientAndProduct(String clientId, String productId);

    void deleteByClient(String clientId);

    void deleteByClientAndProduct(String client, String product);
}
