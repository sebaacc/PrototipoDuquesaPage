package com.dh.msusers.application.utils.constants;

import lombok.experimental.UtilityClass;

@UtilityClass
public class Endpoints {

    public static final String BASE_PATH = "/users";
    public static final String GET_BY_ID = "/{id}";
    public static final String TOKEN_INTROSPECT = "/token-introspect";
    public static final String LOGIN = "/login";
    public static final String VERIFY = "/verify";
    public static final String PATCH_UPDATE = "/{id}";

}
