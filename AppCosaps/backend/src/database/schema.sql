CREATE DATABASE IF NOT EXISTS appcosaps;
USE appcosaps;

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CPF VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Routine(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT,
    scheduled_date TIMESTAMP NOT NULL
    FOREIGN KEY (user_id) REFERENCES User(id),
);

CREATE TABLE IF NOT EXISTS Diet(
    id INT AUTO_INCREMENT PRIMARY KEY,
    food VARCHAR(255) NOT NULL,
    routine_id INT,
    qtd VARCHAR(255) NOT NULL,
    meal_time VARCHAR(255) NOT NULL,
    FOREIGN KEY (routine_id) REFERENCES Routine(id)
);

CREATE TABLE IF NOT EXISTS Exercise(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    routine_id INT,
    sets INT NOT NULL,
    reps INT NOT NULL,
    weight INT NOT NULL,
    FOREIGN KEY (routine_id) REFERENCES Routine(id)
);

CREATE TABLE IF NOT EXISTS Feedback(
    id INT AUTO_INCREMENT PRIMARY KEY,
    routine_id INT,
    diet_id INT,
    exercise_id INT,
    rating INT NOT NULL,
    comment VARCHAR(255),
    crated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routine_id) REFERENCES Routine(id),
    FOREIGN KEY (diet_id) REFERENCES Diet(id),
    FOREIGN KEY (exercise_id) REFERENCES Exercise(id),
);