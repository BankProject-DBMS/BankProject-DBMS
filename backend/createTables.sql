CREATE Table Branch (
	BranchID varchar(5),
    City varchar(20),
    Address varchar(200),
	primary key(BranchID)
);

    
CREATE Table Employee (
	EmployeeID varchar(5),
    Name varchar(20),
    Position varchar(200),
    BranchID varchar(5),
    isManager boolean,
    OnlineID varchar(5),
    Password varchar(20),
	primary key(EmployeeID),
    foreign key(BranchID) references Branch(BranchID)
);

CREATE Table Customer (
	CustomerID varchar(5),
    Name varchar(20),
    dateofbirth date,
    Address varchar(200),
    Phone char(12),
    occupation varchar(20),
	primary key(CustomerID)
);



CREATE TABLE OnlineCustomer
(
	OnlineID varchar (10),
    CustomerID varchar(5),
    Password varchar(10),
    PRIMARY KEY (OnlineID),
    foreign key (CustomerID) references customer(CustomerID)
);

CREATE TABLE FDAccountType
(
	TypeID varchar (5),
    Duration numeric(3,0),
    InterestRate numeric(4,2),
	primary key(TypeID)
);

CREATE Table CashAccountType (
	TypeID varchar(5),
    Type varchar(20),
    Minimum numeric(15,2),
    Amount numeric(15,2),
    InterestRate numeric(4,2),
    primary key (TypeID)
);

CREATE Table LoanType (
	TypeID varchar(10),
    InterestRate numeric(4,2),
    primary key(TypeID)
);

CREATE Table CashAccount (
	AccountID varchar(15),
    CustomerID varchar(5),
    DateCreated date,
    TypeID varchar(5),
    Balance numeric(15,2),
    primary key (AccountID),
    foreign key (CustomerID) references Customer(CustomerID),
    foreign key (TypeID) references CashAccountType(TypeID)
);

CREATE TABLE FDAccount
(
	AccountID varchar(15),
    TypeID varchar(5),
    SavingsAccountID varchar(15),
    Amount numeric(15,2),
    DateCreated date,
    primary key (AccountID),
    foreign key (TypeID) references FDAccountType(TypeID),
    foreign key (SavingsAccountID) references CashAccount(AccountID)
);

CREATE Table Transaction (
	TransactionID varchar(10),
    FromAccount varchar(15),
    ToAccount varchar(15),
    Amount numeric(15,2),
    Remark varchar(50),
    Date date,
	primary key (TransactionID),
    foreign key (FromAccount) references CashAccount(AccountID),
    foreign key (ToAccount) references CashAccount(AccountID)
);

CREATE Table Withdrawal (
	TransactionID varchar(10),
    AccountID varchar(15),
    Amount numeric(15,2),
    Remark varchar(50),
    Date date,
	primary key (TransactionID),
    foreign key (AccountID) references CashAccount(AccountID)
);

CREATE Table Deposit (
	TransactionID varchar(10),
    AccountID varchar(15),
    Amount numeric(15,2),
    Remark varchar(50),
    Date date,
	primary key (TransactionID),
    foreign key (AccountID) references CashAccount(AccountID)
);


CREATE Table PhysicalLoan (
	LoanID varchar(5),
    CustomerID varchar(5),
    BranchID varchar(5),
    EmployeeID varchar(5),
    Amount numeric(15,2),
    TypeID varchar(10),
    DateCreated date,
    SavingsAccountID varchar(15),
	primary key(LoanID),
    foreign key(BranchID) references Branch(BranchID),
    foreign key(CustomerID) references Customer(CustomerID),
    foreign key(EmployeeID) references Employee(EmployeeID),
    foreign key(TypeID) references LoanType(TypeID),
    foreign key(SavingsAccountID) references CashAccount(AccountID)
);

CREATE TABLE OnlineLoan (
	LoanID varchar(5),
    CustomerID varchar(5),
    FDAccountID varchar(5),
    Amount numeric(13,2),
    TypeID varchar(10),
    SavingsAccountID varchar(15),
    DateCreated date,
    primary key(LoanID),
    foreign key(CustomerID) references Customer(CustomerID),
    foreign key(FDAccountID) references FDAccount(AccountID),
    foreign key(TypeID) references LoanType(TypeID),
    foreign key(SavingsAccountID) references CashAccount(AccountID)
);

CREATE TABLE OnlineLoanInstallment (
	InstallmentID varchar(5),
	LoanID varchar(5),
    DeadlineDate date,
    Amount numeric(13,2),
    Paid boolean,
    primary key (InstallmentID) ,
    foreign key (LoanID) references onlineloan(LoanID)
);

CREATE TABLE PhysicalLoanInstallment (
	InstallmentID varchar(5),
	LoanID varchar(5),
    DeadlineDate date,
    Amount numeric(13,2),
    Paid boolean,
    primary key (InstallmentID) ,
    foreign key(LoanID) references physicalloan(LoanID)
);
-- hello udara
-- bye inuka
-- hi

