FROM ghcr.io/graalvm/native-image-community:21
ARG JAR_FILE=target/ms-discovery-0.0.1.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
