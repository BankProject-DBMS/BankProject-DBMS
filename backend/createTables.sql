drop table if exists PhysicalLoanInstallment,OnlineLoanInstallment,OnlineLoan,PhysicalLoan,Deposit,Withdrawal,Transaction,FDAccount,CashAccount,LoanType,CashAccountType,FDAccountType,OnlineCustomer,Customer,Employee,Branch;

CREATE Table Branch (
	BranchID INT NOT NULL AUTO_INCREMENT,
    City varchar(20),
    Address varchar(200),
	primary key(BranchID)
);

    
CREATE Table Employee (
	EmployeeID INT NOT NULL AUTO_INCREMENT,
    Name varchar(20),
    Position varchar(200),
    BranchID INT,
    isManager boolean,
    OnlineID varchar(10),
    Password varchar(20),
    isManager boolean,
	primary key(EmployeeID),
    foreign key(BranchID) references Branch(BranchID)
);

CREATE Table Customer (
	CustomerID INT NOT NULL AUTO_INCREMENT,
    Name varchar(20),
    dateofbirth date,
    Address varchar(200),
    Phone char(12),
    occupation varchar(20),
	primary key(CustomerID)
);


CREATE TABLE OnlineCustomer
(
	OnlineID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    Password varchar(10),
    PRIMARY KEY (OnlineID),
    foreign key (CustomerID) references Customer(CustomerID)
);

CREATE TABLE FDAccountType
(
	TypeID varchar(7),
    Duration numeric(3,0),
    InterestRate numeric(4,2),
	primary key(TypeID)
);

CREATE Table CashAccountType (
	TypeID varchar(5),
    Type varchar(20),
    Minimum numeric(15,2),
    WCountMax int,
    InterestRate numeric(4,2),
    primary key (TypeID)
);

CREATE Table LoanType (
	TypeID varchar(5),
    Type varchar(20),
    InterestRate numeric(4,2),
    primary key(TypeID)
);

CREATE Table CashAccount (
	AccountID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TypeID varchar(5),
    Balance numeric(15,2),
    WCount int,
    primary key (AccountID),
    foreign key (CustomerID) references Customer(CustomerID),
    foreign key (TypeID) references CashAccountType(TypeID)
);

CREATE TABLE FDAccount
(
	AccountID INT NOT NULL AUTO_INCREMENT,
    TypeID varchar(7),
    SavingsAccountID INT,
    Amount numeric(15,2),
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (AccountID),
    foreign key (TypeID) references FDAccountType(TypeID),
    foreign key (SavingsAccountID) references CashAccount(AccountID)
);

CREATE Table Transaction (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    FromAccount INT,
    ToAccount INT,
    Amount numeric(15,2),
    Remark varchar(50),
    TransactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (FromAccount) references CashAccount(AccountID),
    foreign key (ToAccount) references CashAccount(AccountID)
);

CREATE Table Withdrawal (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    AccountID INT,
    Amount numeric(15,2),
    Remark varchar(50),
    WithdrawalTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (AccountID) references CashAccount(AccountID)
);

CREATE Table Deposit (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    AccountID INT,
    Amount numeric(15,2),
    Remark varchar(50),
    DepositTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (AccountID) references CashAccount(AccountID)
);


CREATE Table PhysicalLoan (
	LoanID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    BranchID INT,
    EmployeeID INT,
    Amount numeric(15,2),
    TypeID varchar(5),
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    SavingsAccountID INT,
	primary key(LoanID),
    foreign key(BranchID) references Branch(BranchID),
    foreign key(CustomerID) references Customer(CustomerID),
    foreign key(EmployeeID) references Employee(EmployeeID),
    foreign key(TypeID) references LoanType(TypeID),
    foreign key(SavingsAccountID) references CashAccount(AccountID)
);

CREATE TABLE OnlineLoan (
	LoanID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    FDAccountID INT,
    Amount numeric(13,2),
    TypeID varchar(5),
    SavingsAccountID INT,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key(LoanID),
    foreign key(CustomerID) references Customer(CustomerID),
    foreign key(FDAccountID) references FDAccount(AccountID),
    foreign key(TypeID) references LoanType(TypeID),
    foreign key(SavingsAccountID) references CashAccount(AccountID)
);

CREATE TABLE OnlineLoanInstallment (
	InstallmentID INT NOT NULL AUTO_INCREMENT,
	LoanID INT,
    DeadlineDate date,
    Amount numeric(13,2),
    Paid boolean,
    primary key (InstallmentID) ,
    foreign key (LoanID) references OnlineLoan(LoanID)
);

CREATE TABLE PhysicalLoanInstallment (
	InstallmentID INT NOT NULL AUTO_INCREMENT,
	LoanID INT,
    DeadlineDate date,
    Amount numeric(13,2),
    Paid boolean,
    primary key (InstallmentID) ,
    foreign key(LoanID) references PhysicalLoan(LoanID)
);


-- suggestions for upgrading the database
-- 1. give special privilages to customers who are also employees
-- 2. refresh the wcount of the cash account at the end of the month