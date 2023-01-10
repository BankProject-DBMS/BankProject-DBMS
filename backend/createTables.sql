CREATE SCHEMA IF NOT EXISTS DBMS_BankApp;
use DBMS_BankApp;
drop table if exists PhysicalLoanInstallment,OnlineLoanInstallment,OnlineLoan,PhysicalLoan,Deposit,Withdrawal,Transaction,FDAccount,CashAccount,LoanType,CashAccountType,FDAccountType,OnlineCustomer,Customer,Employee,Branch;
drop procedure if exists generate_physical_installments;
drop procedure if exists generate_online_installments;
drop procedure if exists withdrawals_procedure;
drop procedure if exists transfers_procedure;
drop trigger if exists gen_physical_installments_on_loan_approve;
drop trigger if exists gen_online_installments_on_loan_approve;

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
    isManager boolean default false,
    OnlineID varchar(10),
    Password varchar(100),
	primary key(EmployeeID),
    foreign key(BranchID) 
        references Branch(BranchID)
        on delete cascade
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
    Username varchar(12),
    CustomerID INT,
    Password varchar(100),
    PRIMARY KEY (OnlineID),
    foreign key (CustomerID) 
        references Customer(CustomerID)
        on delete cascade
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
    BranchID INT,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TypeID varchar(5),
    Balance numeric(15,2),
    WCount int,
    primary key (AccountID),
    foreign key (CustomerID) 
        references Customer(CustomerID)
        on delete cascade,
	foreign key(BranchID) 
        references Branch(BranchID)
        on delete cascade,
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
    foreign key (SavingsAccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table Transaction (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    FromAccount INT,
    ToAccount INT,
    Amount numeric(15,2),
    Remark varchar(50),
    TransactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (FromAccount) 
        references CashAccount(AccountID)
        on delete cascade,
    foreign key (ToAccount) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table Withdrawal (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    AccountID INT,
    Amount numeric(15,2),
    Remark varchar(50),
    WithdrawalTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (AccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table Deposit (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    AccountID INT,
    Amount numeric(15,2),
    Remark varchar(50),
    DepositTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (AccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table PhysicalLoan (
	LoanID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    BranchID INT,
    EmployeeID INT,
    Amount numeric(15,2),
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Approved boolean default false,
    Duration numeric(3,0),
    InterestRate numeric(4,2),
    SavingsAccountID INT,
	primary key(LoanID),
    foreign key(BranchID) 
        references Branch(BranchID)
        on delete cascade,
    foreign key(CustomerID) 
        references Customer(CustomerID)
        on delete cascade,
    foreign key(EmployeeID) 
        references Employee(EmployeeID)
        on delete cascade,
    foreign key(SavingsAccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE TABLE OnlineLoan (
	LoanID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT,
    FDAccountID INT,
    Amount numeric(13,2),
    SavingsAccountID INT,
    BranchID INT,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Duration numeric(3,0),
    InterestRate numeric(4,2),
    primary key(LoanID),
    foreign key(CustomerID) 
        references Customer(CustomerID)
        on delete cascade,
    foreign key(FDAccountID) 
        references FDAccount(AccountID)
        on delete cascade,
    foreign key(SavingsAccountID) 
        references CashAccount(AccountID)
        on delete cascade,
	foreign key(BranchID) 
        references Branch(BranchID)
        on delete cascade
);

CREATE TABLE OnlineLoanInstallment (
	InstallmentID INT NOT NULL AUTO_INCREMENT,
	LoanID INT,
    DeadlineDate timestamp,
    Amount numeric(13,2),
    Paid boolean,
    primary key (InstallmentID) ,
    foreign key (LoanID) 
        references OnlineLoan(LoanID)
        on delete cascade
);

CREATE TABLE PhysicalLoanInstallment (
	InstallmentID INT NOT NULL AUTO_INCREMENT,
	LoanID INT,
    DeadlineDate timestamp,
    Amount numeric(13,2),
    Paid boolean,
    primary key (InstallmentID) ,
    foreign key(LoanID) 
        references PhysicalLoan(LoanID)
        on delete cascade
);

DELIMITER $$
create procedure generate_physical_installments(IN LoanID int, IN installmentCount smallint ,IN approvedDate timestamp, IN loanAmount int)
begin
	declare i smallint;
    declare installmentAmount int;
    declare installmentDate timestamp;
    set installmentAmount = loanAmount/installmentCount;
    set installmentDate = approvedDate;
    set i = 1;
    while i <= installmentCount do
		set installmentDate = timestampadd(MONTH, 1, installmentDate);
    	insert into PhysicalLoanInstallment (LoanID, DeadlineDate, Amount, Paid) values (LoanID, installmentDate, installmentAmount, false);
        set i = i + 1;
    end while;
end$$
DELIMITER ;

DELIMITER $$
create procedure generate_online_installments(IN LoanID int, IN installmentCount smallint ,IN approvedDate timestamp, IN loanAmount int)
begin
	declare i smallint;
    declare installmentAmount int;
    declare installmentDate timestamp;
    set installmentAmount = loanAmount/installmentCount;
    set installmentDate = approvedDate;
    set i = 1;
    while i <= installmentCount do
		set installmentDate = timestampadd(MONTH, 1, installmentDate);
    	insert into OnlineLoanInstallment (LoanID, DeadlineDate, Amount, Paid) values (LoanID, installmentDate, installmentAmount, false);
        set i = i + 1;
    end while;
end$$
DELIMITER ;

DELIMITER $$
create trigger gen_physical_installments_on_loan_approve
	after update on PhysicalLoan for each row
begin
    if OLD.Approved = false and NEW.Approved = true then
    	call generate_physical_installments(NEW.LoanID, NEW.Duration, NEW.DateCreated, NEW.Amount);
    end if;
end$$
DELIMITER ;

DELIMITER $$
create trigger gen_online_installments_on_loan_approve
	after insert on PhysicalLoan for each row
begin
    call generate_online_installments(NEW.LoanID, NEW.Duration, NEW.DateCreated, NEW.Amount);
end$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE withdrawals_procedure (IN ID int, IN amount int, IN remark varchar(50) , OUT code varchar(50))

BEGIN
	DECLARE balance decimal(15,2);
    DECLARE wCount int;
    DECLARE new_b decimal(15,2);
    DECLARE new_w int;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
	
    -- SELECT ID,amount,remark;
    
    START TRANSACTION;
		SET wCount = (SELECT cashaccount.WCount FROM cashaccount WHERE AccountID = ID);
		SET balance = (SELECT cashaccount.balance FROM cashaccount WHERE AccountID = ID);
        
        
        IF 0 >= wCount  THEN
			ROLLBACK;
            SET code = 'Withdrawal Count Exceeded';
		ELSE
			IF 500>(balance - amount) THEN
				ROLLBACK;
                SET code = 'Insufficient Balance';
            ELSE
				SET new_w = WCount-1;
                SET new_b = balance - amount;
                SELECT new_b,new_w;
				INSERT INTO withdrawal(AccountID, Amount, Remark) values (ID,amount,remark);
                UPDATE cashaccount SET WCount = new_w  WHERE AccountID = ID;
				UPDATE cashaccount SET Balance = new_b WHERE AccountID = ID;
				COMMIT;	
				SET code =  'SUCCESS';
			END IF;
        END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE transfers_procedure (IN ID1 int, IN ID2 int, IN amount int, IN remark varchar(50), OUT code varchar(50))
BEGIN 
    DECLARE balance decimal(15,2);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
	
    START TRANSACTION;
		SET balance = (SELECT CashAccount.balance FROM CashAccount WHERE AccountID = ID1);

        IF 500>(balance - amount) THEN
            ROLLBACK;
            set code = 'Insufficient Balance';
            select code;
        ELSE
            INSERT INTO Transaction(FromAccount, ToAccount, Amount, Remark) values (ID1,ID2,amount,remark);
            UPDATE CashAccount SET Balance = Balance - amount WHERE AccountID = ID1;
            UPDATE CashAccount SET Balance = Balance + amount WHERE AccountID = ID2;
            COMMIT;
            set code = 'SUCCESS';
            select code;
        END IF;
END$$
DELIMITER ;


-- suggestions for upgrading the database
-- 1. give special privilages to customers who are also employees
-- 2. refresh the wcount of the cash account at the end of the month
-- 3. proper structure for loans 
-- 4. NIC and identification details for persons
-- 5. Children accounts special format