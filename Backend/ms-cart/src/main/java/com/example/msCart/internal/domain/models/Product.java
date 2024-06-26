package com.example.msCart.internal.domain.models;

import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Product {

        private String id;
        private String name;
        private Integer price;
        private String description;
        private List<String> ImageURLs;
        private Integer amount;
        private String subCategoryId;
        @Transient
        private Integer quantityAvailable;

}
