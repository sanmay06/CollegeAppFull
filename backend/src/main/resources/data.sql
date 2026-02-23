-- Drop outdated constraint if it exists to allow 'EMPLOYEE' role
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;

-- Insert default branch
INSERT INTO branches (branch_name, branch_desc) 
VALUES ('Computer Science', 'Computer Science and Engineering') 
ON CONFLICT (branch_name) DO NOTHING;

-- -- Insert default quota
-- INSERT INTO quota (name, description) 
-- VALUES ('General', 'General Quota') 
-- ON CONFLICT (name) DO NOTHING;

-- Insert student test user
-- Password is 'pass'
INSERT INTO users (usn, email, password, role, phone) 
VALUES ('TEST001', 'test@example.com', '$2a$12$6pXkP5v4lB0P5O1/eYfVO.0qKqU8/0WjE3B5u.S1Zf8O1W1/6S1Zf', 'STUDENT', '1234567890') 
ON CONFLICT (usn) DO NOTHING;

-- Insert teacher test user
INSERT INTO users (usn, email, password, role, phone) 
VALUES ('EMP001', 'emp@example.com', '$2a$12$6pXkP5v4lB0P5O1/eYfVO.0qKqU8/0WjE3B5u.S1Zf8O1W1/6S1Zf', 'EMPLOYEE', '0987654321') 
ON CONFLICT (usn) DO NOTHING;

-- Insert student record
INSERT INTO student (name, user_usn, branch_name, age, dob, cgpa, join_date, semester, year, backlogs, section, quota_name, fees_status) 
VALUES ('Test Student', 'TEST001', 'Computer Science', 20, '2004-01-01', 9.0, '2022-08-01', 4, 3, 0, 'A', 'General', false) 
ON CONFLICT (user_usn) DO NOTHING;

-- Insert employee record
INSERT INTO employee (name, usn, branch_name, age, dob, join_date, salary) 
VALUES ('Test Employee', 'EMP001', 'Computer Science', 35, '1989-01-01', '2015-01-01', 50000) 
ON CONFLICT (usn) DO NOTHING;
