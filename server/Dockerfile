# First stage: Build
FROM maven:3.8.6-openjdk-18-slim AS build
WORKDIR /home/app

# Copy the entire project
COPY . .

# Build the app & skip tests (optional)
RUN mvn clean package -DskipTests=true

# Second stage: Runtime
FROM openjdk:18.0-slim
WORKDIR /app

# Copy jar from build stage
COPY --from=build /home/app/target/*.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]