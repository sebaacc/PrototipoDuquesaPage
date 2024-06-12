package com.dh.msusers.application.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.util.CollectionUtils;

import java.awt.geom.Point2D;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.Spliterator;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@UtilityClass
public class SafeUtils {

    public static <T> Stream<T> stream(Iterable<T> iterable) {
        return iterable == null ? Stream.empty() : stream(iterable.spliterator());
    }

    public static <T> Stream<T> stream(Spliterator<T> spliterator) {
        return spliterator == null ? Stream.empty() : StreamSupport.stream(spliterator, false).filter(Objects::nonNull);
    }


    public static <T> T getElementByIndex(Collection<T> collection, int index, T defaultValue) {
        if (CollectionUtils.isEmpty(collection) || index < 0 || index >= collection.size()) {
            return defaultValue;
        }

        return stream(collection)
                .skip(index)
                .findFirst()
                .orElse(defaultValue);
    }

    public static <T> T getElementByIndex(Collection<T> collection, int index) {
        return getElementByIndex(collection, index, null);
    }

    public static String getAttribute(String key, UserRepresentation userRepresentation) {
        return getElementByIndex(Optional.ofNullable(userRepresentation.getAttributes())
                .map(attributes -> attributes.get(key))
                .orElse(null), 0);
    }

    public static Point2D.Double convertToPoint(String locationJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(locationJson, Point2D.Double.class);
        } catch (Exception e) {
            return null;
        }
    }
}
