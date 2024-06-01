package com.example.msCart.internal.domain.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Category {

    private String id;
    private String name;
    private String description;

    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }


}
