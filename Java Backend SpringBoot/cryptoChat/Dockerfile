# Use an official OpenJDK runtime as the base image
FROM openjdk:17-oracle as builder

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file to the container
COPY out/artifacts/cryptoChat_jar/cryptoChat.jar app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Start the Java Spring application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]

