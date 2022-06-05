INSERT INTO department (name)
VALUES 
('IT'),
('Payment Resolution'),
('Marketing'),
('Onboarding');

INSERT INTO roles (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 55000, 2), 
('Finanical Analyst', 100000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 97000, 3),
('Onboarding Manager', 75000, 4),
('Customer Service Rep', 35000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Bob', 'Ross', 2, null),
('Devin', 'Smith', 1, 1),
('Mary', 'Hairy', 4, null),
('Ashley', 'Thomas', 3, 3),
('Ty', 'Schmaz', 6, null),
('Ruben', 'Sanchez', 5, 5),
('Lewis', 'Hamilton', 7, null),
('Katherine', 'Haygood', 8, 7);