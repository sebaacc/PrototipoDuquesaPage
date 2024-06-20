FROM ghcr.io/graalvm/native-image-community:21
ARG JAR_FILE=target/ms-gateway-0.0.1-SNAPSHOT.jar
COPY ./target/ms-gateway-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
