package com.example.msCart.internal.app.repositories_implements;

import com.example.msCart.internal.domain.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByClient(String clientId);

    Optional<Cart> findByClientAndProduct(String clientId, String productId);

    void deleteByClient(String clientId);

    void deleteByClientAndProduct(String client, String product);

    void deleteByProduct(String productId);


    @Query(value = "SELECT c.product, SUM(c.quantity) AS totalQuantity " +
            "FROM cart c " +
            "GROUP BY c.product " +
            "ORDER BY totalQuantity DESC " +
            "LIMIT :limit",
            nativeQuery = true)
    List<Object[]> findMostAddedProducts(@Param("limit") int limit);








}
