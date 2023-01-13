-- delete data in all tables
DELETE FROM Transaction;
DELETE FROM Withdrawal;
DELETE FROM Deposit;
DELETE FROM OnlineCustomer;
DELETE FROM PhysicalLoan;
DELETE FROM Employee;
DELETE FROM OnlineLoan;
DELETE FROM FDAccount;
DELETE FROM CashAccount;
DELETE FROM LoanType;
DELETE FROM CashAccountType;
DELETE FROM FDAccountType;
DELETE FROM Customer;
DELETE FROM Branch;

-- insert data into tables
INSERT INTO Branch(City, Address)
VALUES
	("Moratuwa", "1st Lane, Katubadda"),
    ("Borella", "D.S.Senanayake Mawatha, Punchi Borella"),
    ("Anuradhapura", "1st Lane, Pooja Nagaraya");
    
INSERT INTO Customer(Name, dateofbirth, Address, Phone, occupation)
VALUES
	("A.L. Abeweera", '2000-04-01', "No: 2nd Lane, Bandaragama", '+94761234567', 'CS Engineer'),
    ("U.M. Wijesighe", '2000-03-02', "No: 45, Papiliyana, Boralesgamuwa", "+94764964790", 'Engineer'),
    ("Nimesh Ranchagoda", '2000-08-17', "No; 144, Angoda", "+94774964790", "Tennis Trainer"),
    ("Inuka Ampavila", '2000-10-16', "No: 15, Rathanapitiya, Boralesgamuwa", "+94774567891" ,"Shooter"),
    ("Radith Samarakoon", '1998-12-12', "No: 12, Galle Road, Mount Laviniya", "+94724561232", "Full Stack Developer"),
    ("Akmal A. Jasmin", '1999-01-01', "No: 54, Galle Road, Kalutara", "+94724561232", "Full Stack Developer"),
    ("K.W.P.K. Peiris", '1998-05-20', "No: 78, Matara Road, Kamburupitiya", "+94765783421", "Electronics Engineer"),
    ("L.G. Jayawardana", '1997-07-15', "No: 12, Colombo Road, Ambepussa", "+94774567890", "Mechanical Engineer"),
    ("N.P. Nandalal", '1998-11-23', "No: 34, Galle Road, Welipenna", "+94734567890", "Civil Engineer"),
    ("R.M.S.R. Rajapaksha", '1999-02-28', "No: 11, Kandy Road, Kadawatha", "+94721567890", "Chemical Engineer"),
    ("S.S.S. Kumara", '1997-09-09', "No: 45, Gampaha Road, Minuwangoda", "+94789756432", "Electronics Engineer"),
    ("D.M.S.K. De Silva", '1997-12-01', "No: 12, Kottawa Road, Pannipitiya", "+94787564321", "Electrical Engineer"),
    ("M.W. Premarathne", '1997-01-25', "No: 16, Kegalle Road, Avissawella", "+94789456123", "Computer Engineer"),
    ("N.D. Jayawardene", '1997-03-14', "No: 22, Matara Road, Galle", "+94713456789", "Environmental Engineer"),
    ("P.G. Wijeratne", '1997-05-12', "No: 34, Batticaloa Road, Trincomalee", "+94778456789", "Geotechnical Engineer"),
    ("R.G. Jayasinghe", '1997-07-29', "No: 45, Anuradhapura Road, Kurunegala", "+94771345678", "Structural Engineer"),
    ("S.S. Silva", '1997-10-02', "No: 12, Nuwara Eliya Road, Hatton", "+94778451234", "Transportation Engineer"),
    ("T.K. Rajapaksha", '1997-11-19', "No: 15, Jaffna Road, Vavuniya", "+94779651234", "Industrial Engineer");

INSERT INTO FDAccountType(TypeID, Duration, Interestrate)
VALUES
	("F061300", 6, 13.0),
    ("F121450", 12, 14.5),
    ("F361500", 36, 15.0);

INSERT INTO CashAccountType(TypeID, Type, Minimum, WCountMax, InterestRate )
VALUES
	("C0", "Current", 0.00, 1000000000, 0 ),
    ("SC", "Children", 0.00, 0, 12 ),
    ("ST", "Teen", 500.00, 5, 11),
    ("SA", "Adult", 1000.00, 5, 10),
    ("SS", "Senior", 1000.00, 5, 13);


INSERT INTO CashAccount(customerID,BranchID, TypeID, Balance, WCount)
VALUES
    (1,1, "SA", 1004000.00, 4),
    (2,1, "SA", 2834000.00, 2),
    (3,2, "SA", 3000561.00, 3),
    (4,2, "C0", 141000.00, 0),
    (4,1, "SA", 145000.00, 0),
    (5,1, "ST", 1341.00, 4),
    (6,1, "SS", 4240010.00, 5),
    (1, 1, 'SC', 20000.00, 0),
    (2, 2, 'SA', 15000.00, 4),
    (3, 3, 'C0', 12000.00, 0),
    (4, 1, 'ST', 8000.00, 2),
    (5, 2, 'C0', 3000.00, 0),
    (6, 3, 'SA', 2000.00, 3),
    (7, 1, 'C0', 10000.00, 0),
    (8, 2, 'SS', 6000.00, 1),
    (9, 3, 'C0', 4000.00, 0),
    (10, 1, 'SA', 5000.00, 5),
    (11, 2, 'C0', 9000.00, 0),
    (12, 3, 'SA', 7000.00, 3),
    (13, 1, 'C0', 11000.00, 0),
    (14, 2, 'SA', 8000.00, 2),
    (15, 3, 'C0', 13000.00, 0),
    (16, 1, 'SA', 9000.00, 4),
    (17, 2, 'C0', 14000.00, 0),
    (18, 3, 'SA', 15000.00, 3);


INSERT INTO FDAccount(TypeID, SavingsAccountID, Amount)
VALUES
    ('F061300', 1, 100000),
    ('F121450', 2, 200000),
    ('F361500', 3, 300000),
    ('F361500', 5, 300000),
    ('F361500', 5, 300000),
    ('F061300', 1, 100000.00),
    ('F121450', 2, 150000.00),
    ('F361500', 3, 200000.00),
    ('F061300', 4, 50000.00),
    ('F121450', 5, 80000.00),
    ('F361500', 6, 150000.00),
    ('F061300', 7, 120000.00),
    ('F121450', 8, 180000.00),
    ('F361500', 9, 250000.00),
    ('F061300', 10, 35000.00),
    ('F121450', 11, 55000.00),
    ('F361500', 12, 85000.00),
    ('F061300', 13, 100000.00),
    ('F121450', 14, 150000.00),
    ('F361500', 15, 200000.00),
    ('F061300', 16, 50000.00),
    ('F121450', 17, 80000.00),
    ('F361500', 18, 150000.00);


INSERT INTO OnlineLoan(CustomerID, FDAccountID, Amount, Duration, InterestRate, SavingsAccountID,BranchID)
VALUES
    (4, 1, 150000, 6, 13.0, 1,1),
    (2, 2, 212000, 12, 14.5, 2,1),
    (3, 3, 550000, 36, 15.0, 3,1);

INSERT INTO Employee(Name, Position, BranchID, isManager, OnlineID, Password)
VALUES
	("A.N.Cabral","L1-Employee",1,0,"cabral","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC"),
    ("Vasudewa","L1-Employee",2,0,"vasu","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC"),
    ("Mahinda R","L2-Employee",3,0,"MR","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC"),
    ("Basil","L1-Employee",1,0,"basil","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC"),
    ("Ranil W.","Manager",1,1,"ranil","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC"),
    ("Gotabaya R","Manager",2,1,"gota","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC"),
    ("Ravi K","Manager",3,1,"ravi","$2b$10$q9H/eX.eoU2KTwJ.i54gjOf9AUFSP3KiCJJ08V0WSdEF8JsNd.5vC");
    
    
INSERT INTO PhysicalLoan(CustomerID, BranchID, EmployeeID, Amount, Duration, InterestRate, SavingsAccountID)
VALUES
    (1, 1, 1, 100000, 6, 13.0, 1),
    (2, 2, 2, 200000, 12, 14.5, 2),
    (3, 3, 3, 300000, 36, 15.0, 3);

INSERT INTO OnlineCustomer(CustomerID, Username, Password)
VALUES
    (1, 'AnjulaRox', '$2b$10$lQOrEvIUlVVQgcHFWsOJM.i8GWyqlTnOoT5POomjVCmh6YK0wzeyi'),
    (2, 'UdaraMali', '$2b$10$lQOrEvIUlVVQgcHFWsOJM.i8GWyqlTnOoT5POomjVCmh6YK0wzeyi'),
    (4, 'Inuka123', '$2b$10$lQOrEvIUlVVQgcHFWsOJM.i8GWyqlTnOoT5POomjVCmh6YK0wzeyi'),
    (5, 'RadithSam', '$2b$10$lQOrEvIUlVVQgcHFWsOJM.i8GWyqlTnOoT5POomjVCmh6YK0wzeyi');
    
INSERT INTO Deposit(AccountID, Amount, Remark, DepositTime)
VALUES
    (1, 4000.00, "Salary", "2022-01-01 08:00:00"),
    (1, 1000.00, "Investment", "2022-01-02 10:00:00"),
    (1, 2000.00, "Bonus", "2022-01-03 12:00:00"),
    (2, 6000.00, "Business profits", "2022-01-01 09:00:00"),
    (2, 2000.00, "Gift", "2022-01-02 14:00:00"),
    (2, 4000.00, "Sell old items", "2022-01-03 16:00:00"),
    (3, 5500.00, "Investment return", "2022-01-01 10:00:00"),
    (3, 2500.00, "Freelancing income", "2022-01-02 13:00:00"),
    (1, 500.00, "Paying bills", '2022-08-01 12:00:00'),
    (1, 1000.00, "Salary", '2022-08-02 13:00:00'),
    (1, 2000.00, "Business profit", '2022-08-03 14:00:00'),
    (2, 700.00, "Selling car", '2022-08-04 15:00:00'),
    (2, 500.00, "Selling motorcycle", '2022-08-05 16:00:00'),
    (2, 1000.00, "Selling land", '2022-08-06 17:00:00'),
    (3, 600.00, "Selling gold", '2022-08-07 18:00:00'),
    (3, 800.00, "Selling shares", '2022-08-08 19:00:00'),
    (3, 900.00, "Selling land", '2022-08-09 20:00:00'),
    (4, 2000.00, "Salary", '2022-08-10 21:00:00'),
    (4, 1500.00, "Gift from relative", '2022-08-11 22:00:00'),
    (4, 1000.00, "Selling land", '2022-08-12 23:00:00'),
    (5, 500.00, "Selling car", '2022-08-13 00:00:00'),
    (5, 700.00, "Selling shares", '2022-08-14 01:00:00'),
    (5, 800.00, "Selling gold", '2022-08-15 02:00:00'),
    (6, 1000.00, "Salary", '2022-08-16 03:00:00'),
    (6, 800.00, "Selling shares", '2022-08-17 04:00:00'),
    (6, 600.00, "Selling land", '2022-08-18 05:00:00'),
    (7, 1500.00, "Salary", '2022-08-19 06:00:00');

INSERT INTO Withdrawal(AccountID, Amount, Remark, WithdrawalTime)
VALUES
    (1, 2000.00, "Shopping", "2022-01-01 12:00:00"),
    (1, 500.00, "Lunch", "2022-01-02 14:00:00"),
    (1, 1000.00, "Transportation", "2022-01-03 09:00:00"),
    (2, 3000.00, "Car maintenance", "2022-01-01 11:00:00"),
    (2, 800.00, "Grocery shopping", "2022-01-02 15:00:00"),
    (2, 2000.00, "Rent", "2022-01-03 10:00:00"),
    (3, 2500.00, "Tuition fee", "2022-01-01 08:00:00"),
    (3, 1000.00, "Utility bills", "2022-01-02 13:00:00"),
    (3, 1500.00, "Travel", "2022-01-03 16:00:00"),
    (4, 1500.00, "Clothes", "2022-01-01 10:00:00"),
    (4, 500.00, "Gas", "2022-01-02 12:00:00"),
    (4, 1000.00, "Books", "2022-01-03 14:00:00"),
    (5, 2000.00, "Phone bill", "2022-01-01 09:00:00"),
    (5, 800.00, "Entertainment", "2022-01-02 15:00:00"),
    (5, 1500.00, "Car insurance", "2022-01-03 11:00:00"),
    (6, 3000.00, "House maintenance", "2022-01-01 12:00:00"),
    (6, 2000.00, "Food", "2022-01-02 14:00:00"),
    (6, 1500.00, "Savings", "2022-01-03 09:00:00"),
    (7, 800.00, "House Rent", '2022-09-13 15:00:00'),
    (7, 250.00, "Car Maintenance", '2022-09-14 09:30:00'),
    (8, 800.00, "Phone Bill", '2022-09-15 12:00:00'),
    (8, 350.00, "Shopping", '2022-09-16 10:00:00'),
    (9, 600.00, "Travel", '2022-09-17 14:00:00'),
    (9, 800.00, "House Rent", '2022-09-18 15:00:00'),
    (10, 250.00, "Car Maintenance", '2022-09-19 09:30:00'),
    (10, 800.00, "Phone Bill", '2022-09-20 12:00:00');

INSERT INTO Transaction(FromAccount, ToAccount, Amount, Remark)
VALUES
    (1, 2, 1000.0, 'Tuition Fees'),
    (2, 3, 2000.0, 'Rent'),
    (3, 4, 3000.0, 'Groceries'),
    (4, 5, 4000.0, 'Car Repair'),
    (5, 6, 5000.0, 'Gas'),
    (6, 7, 6000.0, 'Utilities'),
    (7, 8, 7000.0, 'Vacation'),
    (8, 9, 8000.0, 'Medical Expenses'),
    (9, 10, 9000.0, 'Clothing'),
    (10, 1, 10000.0, 'Phone Bill'),
    (1, 2, 11000.0, 'Insurance'),
    (2, 3, 12000.0, 'Mortgage'),
    (3, 4, 13000.0, 'Gym Membership'),
    (4, 5, 14000.0, 'Daycare'),
    (5, 6, 15000.0, 'Car Payment'),
    (6, 7, 16000.0, 'Internet'),
    (7, 8, 17000.0, 'Credit Card Debt'),
    (8, 9, 18000.0, 'Student Loans'),
    (9, 10, 19000.0, 'Saving For House'),
    (10, 1, 20000.0, 'Saving For Retirement'),
    (1, 2, 21000.0, 'Saving For Kids Education'),
    (2, 3, 22000.0, 'Supporting Family Member'),
    (3, 4, 23000.0, 'Donation'),
    (4, 5, 24000.0, 'Investing'),
    (5, 6, 25000.0, 'Purchasing A New Car'),
    (6, 7, 100000.0, 'Home Renovation'),
    (7, 8, 35000.0, 'Taking A Vacation'),
    (8, 9, 50000.00, 'Buying furniture'),
    (9, 10, 60000.00, 'Buying an appliance'),
    (10, 1, 70000.00, 'Buying a computer'),
    (1, 2, 80000.00, 'Buying a phone'),
    (2, 3, 90000.00, 'Buying a camera'),
    (3, 4, 50000.00, 'Buying a game console'),
    (4, 6, 45000.00, 'Buying a TV'),
    (5, 7, 40000.00, 'Buying a sound system'),
    (6, 8, 35000.00, 'Buying a musical instrument'),
    (7, 9, 3000.00, 'Buying a book'),
    (8, 10, 2500.00, 'Buying a movie'),
    (9, 1, 2000.00, 'Buying music'),
    (10, 2, 1500.00, 'Buying a video game'),
    (1, 3, 1000.00, 'Buying a gift card'),
    (2, 4, 500.00, 'Buying a service'),
    (3, 5, 750.00, 'Buying a travel package'),
    (4, 6, 800.00, 'Buying an event ticket'),
    (5, 7, 900.00, 'Buying a gift certificate'),
    (6, 8, 2000.00, 'Buying a membership'),
    (7, 9, 1500.00, 'Buying a subscription'),
    (8, 10, 4000.00, 'Buying a license'),
    (9, 1, 25000.00, 'Buying a patent'),
    (10, 2, 30000.00, 'Buying a trademark'),
    (1, 3, 35000.00, 'Buying a franchise'),
    (2, 4, 40000.00, 'Buying a partnership'),
    (3, 5, 450000.00, 'Buying a corporation');
