package com.example.msCart.internal.app.repositories_implements;

import com.example.msCart.internal.domain.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartRepository extends JpaRepository<Cart, Long> {


}
