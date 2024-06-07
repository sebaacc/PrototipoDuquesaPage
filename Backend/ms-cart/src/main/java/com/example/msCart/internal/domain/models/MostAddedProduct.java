package com.example.msCart.internal.domain.models;

import lombok.Data;

@Data
public class MostAddedProduct {

    private String id;
    private Long totalQuantity;
    private String name;
    private String imageURL;
    private Integer price;


}
