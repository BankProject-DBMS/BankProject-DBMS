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
    (6,1, "SS", 4240010.00, 5);

INSERT INTO FDAccount(TypeID, SavingsAccountID, Amount)
VALUES
    ('F061300', 1, 100000),
    ('F121450', 2, 200000),
    ('F361500', 3, 300000),
    ('F361500', 5, 300000),
    ('F361500', 5, 300000);


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
    
INSERT INTO Deposit(AccountID, Amount, Remark)
VALUES
    (1, 10000.00, 'Monthly Saving'),
    (4, 350000.00, 'For car'),
    (5, 4500.00, 'Groccery'),
    (6, 45000.00, 'Laptop');

INSERT INTO Withdrawal(AccountID, Amount, Remark)
VALUES
    (1, 1000, "credit score is 800"),
    (2, 2000, "credit score is 640"),
    (3, 3000, "credit score is 700");

INSERT INTO Transaction(FromAccount, ToAccount, Amount, Remark)
VALUES
    (6, 4, 10000, 'Rent'),
    (1, 2, 20000, 'Salary');
