# Multi-stage Dockerfile for building and running the Spring Boot application
# Builder stage: uses Maven with Eclipse Temurin 17 to compile and package the app
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /workspace

# Copy pom and mvnw to leverage Docker layer caching for dependencies when possible
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Copy source and build
COPY src ./src

# Make mvnw executable (in case permissions are missing) and build the jar
RUN chmod +x mvnw || true
RUN mvn -B -DskipTests package

# Runtime stage: smaller JVM image
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the fat jar produced by the build stage
ARG JAR_FILE=target/svacham_Management-0.0.1-SNAPSHOT.jar
COPY --from=build /workspace/${JAR_FILE} /app/app.jar

# Expose default Spring Boot port
EXPOSE 8080

# Allow overriding JVM options
ENV JAVA_OPTS=""

# Use provided PORT environment variable (Render sets PORT). Fall back to 8080 when PORT is not set.
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar --server.port=${PORT:-8095}"]

