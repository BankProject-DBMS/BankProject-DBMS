CREATE SCHEMA IF NOT EXISTS DBMS_BankApp;
use DBMS_BankApp;
drop table if exists PhysicalLoanInstallment,OnlineLoanInstallment,OnlineLoan,PhysicalLoan,Deposit,Withdrawal,Transaction,FDAccount,CashAccount,LoanType,CashAccountType,FDAccountType,OnlineCustomer,Customer,Employee,Branch;
drop procedure if exists generate_physical_installments;
drop procedure if exists generate_online_installments;
drop procedure if exists withdrawals_procedure;
drop procedure if exists transfers_procedure;
drop procedure if exists approve_loan;
drop procedure if exists create_onlineloan_procedure;
drop procedure if exists pay_phys_installment;
drop procedure if exists pay_onl_installment;
drop trigger if exists gen_physical_installments_on_loan_approve;
drop trigger if exists gen_online_installments_on_loan_approve;

CREATE Table Branch (
	BranchID INT NOT NULL AUTO_INCREMENT,
    City varchar(20) NOT NULL,
    Address varchar(200) NOT NULL,
	primary key(BranchID)
);

    
CREATE Table Employee (
	EmployeeID INT NOT NULL AUTO_INCREMENT,
    Name varchar(20) NOT NULL,
    Position varchar(200) NOT NULL,
    BranchID INT NOT NULL,
    isManager boolean default false,
    OnlineID varchar(10) NOT NULL,
    Password varchar(100) NOT NULL,
	primary key(EmployeeID) ,
    foreign key(BranchID) 
        references Branch(BranchID)
        on delete cascade
);

CREATE Table Customer (
	CustomerID INT NOT NULL AUTO_INCREMENT,
    Name varchar(20) NOT NULL,
    dateofbirth date NOT NULL,
    Address varchar(200) NOT NULL,
    Phone char(12) NOT NULL,
    occupation varchar(50) NOT NULL,
	primary key(CustomerID)
);


CREATE TABLE OnlineCustomer
(
	OnlineID INT NOT NULL AUTO_INCREMENT,
    Username varchar(12) NOT NULL,
    CustomerID INT NOT NULL,
    Password varchar(100) NOT NULL,
    PRIMARY KEY (OnlineID) ,
    foreign key (CustomerID) 
        references Customer(CustomerID)
        on delete cascade
);

CREATE TABLE FDAccountType
(
	TypeID varchar(7) ,
    Duration numeric(3,0),
    InterestRate numeric(4,2),
	primary key(TypeID)
);

CREATE Table CashAccountType (
	TypeID varchar(5) NOT NULL,
    Type varchar(20) NOT NULL,
    Minimum numeric(15,2) NOT NULL,
    WCountMax int NOT NULL,
    InterestRate numeric(4,2) NOT NULL,
    primary key (TypeID)
);

CREATE Table LoanType (
	TypeID varchar(5) NOT NULL,
    Type varchar(20) NOT NULL,
    InterestRate numeric(4,2) NOT NULL,
    primary key(TypeID)
);

CREATE Table CashAccount (
	AccountID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT NOT NULL,
    BranchID INT NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    TypeID varchar(5) NOT NULL,
    Balance numeric(15,2) NOT NULL,
    WCount int NOT NULL,
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
    TypeID varchar(7) NOT NULL,
    SavingsAccountID INT NOT NULL,
    Amount numeric(15,2) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (AccountID),
    foreign key (TypeID) references FDAccountType(TypeID),
    foreign key (SavingsAccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table Transaction (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    FromAccount INT NOT NULL,
    ToAccount INT NOT NULL,
    Amount numeric(15,2) NOT NULL,
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
    AccountID INT NOT NULL,
    Amount numeric(15,2) NOT NULL,
    Remark varchar(50) ,
    WithdrawalTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (AccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table Deposit (
	TransactionID INT NOT NULL AUTO_INCREMENT,
    AccountID INT NOT NULL,
    Amount numeric(15,2) NOT NULL,
    Remark varchar(50) ,
    DepositTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	primary key (TransactionID),
    foreign key (AccountID) 
        references CashAccount(AccountID)
        on delete cascade
);

CREATE Table PhysicalLoan (
	LoanID INT NOT NULL AUTO_INCREMENT,
    CustomerID INT NOT NULL,
    BranchID INT NOT NULL,
    EmployeeID INT NOT NULL,
    Amount numeric(15,2) NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Approved boolean default false,
    Duration numeric(3,0) NOT NULL,
    InterestRate numeric(4,2) NOT NULL,
    SavingsAccountID INT NOT NULL,
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
    CustomerID INT NOT NULL,
    FDAccountID INT NOT NULL,
    Amount numeric(13,2) NOT NULL,
    SavingsAccountID INT NOT NULL,
    BranchID INT NOT NULL,
    DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Duration numeric(3,0) NOT NULL,
    InterestRate numeric(4,2) NOT NULL,
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
	LoanID INT NOT NULL,
    DeadlineDate timestamp,
    Amount numeric(13,2) NOT NULL,
    Paid boolean NOT NULL,
    primary key (InstallmentID) ,
    foreign key (LoanID) 
        references OnlineLoan(LoanID)
        on delete cascade
);

CREATE TABLE PhysicalLoanInstallment (
	InstallmentID INT NOT NULL AUTO_INCREMENT,
	LoanID INT NOT NULL,
    DeadlineDate timestamp,
    Amount numeric(13,2) NOT NULL,
    Paid boolean NOT NULL,
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
	after insert on OnlineLoan for each row
begin
    call generate_online_installments(NEW.LoanID, NEW.Duration, NEW.DateCreated, NEW.Amount);
end$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE create_onlineloan_procedure (IN customerID int, IN savingsAccountID int, IN amount int, IN duration int ,IN fDAccountID int,IN interestRate decimal(4,2), OUT code varchar(50))
BEGIN  	
	DECLARE branchID int;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
    
    START TRANSACTION;
		SET branchID = (SELECT CashAccount.BranchID FROM CashAccount WHERE CashAccount.AccountID = savingsAccountID);
        SELECT branchID;
		INSERT INTO OnlineLoan 
        (OnlineLoan.CustomerID, OnlineLoan.FDAccountID, OnlineLoan.Amount, OnlineLoan.Duration, OnlineLoan.InterestRate, OnlineLoan.SavingsAccountID,OnlineLoan.BranchID) 
        Values 
			(customerID,fDAccountID,amount,duration,interestRate,savingsAccountID,branchID);
		UPDATE CashAccount SET Balance = Balance + amount WHERE CashAccount.AccountID = savingsAccountID;
		COMMIT;
END$$
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
		SET wCount = (SELECT CashAccount.WCount FROM CashAccount WHERE AccountID = ID);
		SET balance = (SELECT CashAccount.Balance FROM CashAccount WHERE AccountID = ID);
        
        
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
				INSERT INTO Withdrawal(AccountID, Amount, Remark) values (ID,amount,remark);
                UPDATE CashAccount SET WCount = new_w  WHERE AccountID = ID;
				UPDATE CashAccount SET Balance = new_b WHERE AccountID = ID;
				COMMIT;	
				SET code =  'SUCCESS';
			END IF;
        END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE transfers_procedure (IN to_ID int, IN from_ID int, IN amount int, IN remark varchar(50), OUT code varchar(50))
BEGIN 
    DECLARE balance decimal(15,2);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
	
    START TRANSACTION;
		SET balance = (SELECT CashAccount.balance FROM CashAccount WHERE AccountID = to_ID);

        IF 500>(balance - amount) THEN
            ROLLBACK;
            set code = 'Insufficient Balance';
            select code;
        ELSE
            INSERT INTO Transaction(FromAccount, ToAccount, Amount, Remark) values (to_ID,from_ID,amount,remark);
            UPDATE CashAccount SET Balance = Balance - amount WHERE AccountID = to_ID;
            UPDATE CashAccount SET Balance = Balance + amount WHERE AccountID = from_ID;
            COMMIT;
            set code = 'SUCCESS';
            select code;
        END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE approve_loan (IN loanID INT)
BEGIN
    DECLARE approved boolean;
    DECLARE code varchar(50);
    DECLARE amount int;
    DECLARE savingsID int;
    
    DECLARE EXIT HANDLER FOR SQLEXception 
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;
    START TRANSACTION;
        SET approved = (SELECT PhysicalLoan.Approved FROM PhysicalLoan WHERE PhysicalLoan.LoanID = loanID LIMIT 1);
        SELECT loanID;
        IF approved = true THEN
            ROLLBACK;
            set code = 'ALREADY_APPROVED';
            select code;
        ELSE
            UPDATE PhysicalLoan SET Approved = true WHERE PhysicalLoan.LoanID = loanID;
            # TO BE CHECKED
            SET amount = (SELECT PhysicalLoan.Amount FROM PhysicalLoan WHERE PhysicalLoan.LoanID = loanID);
            # SELECT amount;
            UPDATE CashAccount SET Balance = Balance + (SELECT PhysicalLoan.Amount FROM PhysicalLoan WHERE PhysicalLoan.LoanID = loanID) 
            WHERE CashAccount.AccountID =(SELECT PhysicalLoan.SavingsAccountID FROM PhysicalLoan WHERE PhysicalLoan.LoanID = loanID) ;
            COMMIT;
            set code = 'SUCCESS';
            select code;
        END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE pay_phys_installment (IN installmentID INT)
BEGIN
    DECLARE paid boolean;
    DECLARE code varchar(50);
    DECLARE amount int;
    DECLARE savingsID int;
    DECLARE balance decimal(15,2);
    
    DECLARE EXIT HANDLER FOR SQLEXception 
        BEGIN
            set code = 'FAILED';
            select code;
            ROLLBACK;
            RESIGNAL;
        END;
    START TRANSACTION;
        SET paid = (SELECT PhysicalLoanInstallment.Paid FROM PhysicalLoanInstallment WHERE PhysicalLoanInstallment.InstallmentID = installmentID LIMIT 1);
        IF paid is NULL THEN
            ROLLBACK;
            set code = 'INSTALLMENT_NOT_FOUND';
            select code;
        ELSEIF paid = true THEN
            ROLLBACK;
            set code = 'ALREADY_PAID';
            select code;
        ELSE
            UPDATE PhysicalLoanInstallment SET Paid = true WHERE PhysicalLoanInstallment.InstallmentID = installmentID;
            SET amount = (SELECT PhysicalLoanInstallment.Amount FROM PhysicalLoanInstallment WHERE PhysicalLoanInstallment.InstallmentID = installmentID LIMIT 1);
            set savingsID = (select PhysicalLoan.SavingsAccountID from PhysicalLoanInstallment join PhysicalLoan using (LoanID) WHERE PhysicalLoanInstallment.InstallmentID = installmentID LIMIT 1);
            set balance = (select CashAccount.Balance from CashAccount where CashAccount.AccountID = savingsID LIMIT 1);
            IF 500 >= balance - amount THEN
                ROLLBACK;
                set code = 'INSUFFICIENT_BALANCE';
                select code;
            ELSE
                UPDATE CashAccount SET Balance = Balance - amount WHERE CashAccount.AccountID = savingsID;
                COMMIT;
                set code = 'SUCCESS';
                select code;
            END IF;
        END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE pay_onl_installment (IN installmentID INT)
BEGIN
    DECLARE paid boolean;
    DECLARE code varchar(50);
    DECLARE amount int;
    DECLARE savingsID int;
    DECLARE balance decimal(15,2);
    
    DECLARE EXIT HANDLER FOR SQLEXception 
        BEGIN
            set code = 'FAILED';
            select code;
            ROLLBACK;
            RESIGNAL;
        END;
    START TRANSACTION;
        SET paid = (SELECT OnlineLoanInstallment.Paid FROM OnlineLoanInstallment WHERE OnlineLoanInstallment.InstallmentID = installmentID LIMIT 1);
        IF paid is NULL THEN
            ROLLBACK;
            set code = 'INSTALLMENT_NOT_FOUND';
            select code;
        ELSEIF paid = true THEN
            ROLLBACK;
            set code = 'ALREADY_PAID';
            select code;
        ELSE
            UPDATE OnlineLoanInstallment SET Paid = true WHERE OnlineLoanInstallment.InstallmentID = installmentID;
            SET amount = (SELECT OnlineLoanInstallment.Amount FROM OnlineLoanInstallment WHERE OnlineLoanInstallment.InstallmentID = installmentID LIMIT 1);
            set savingsID = (select OnlineLoan.SavingsAccountID from OnlineLoanInstallment join OnlineLoan using (LoanID) WHERE OnlineLoanInstallment.InstallmentID = installmentID LIMIT 1);
            set balance = (select CashAccount.Balance from CashAccount where CashAccount.AccountID = savingsID LIMIT 1);
            IF 500 >= balance - amount THEN
                ROLLBACK;
                set code = 'INSUFFICIENT_BALANCE';
                select code;
            ELSE
                UPDATE CashAccount SET Balance = Balance - amount WHERE CashAccount.AccountID = savingsID;
                COMMIT;
                set code = 'SUCCESS';
                select code;
            END IF;
        END IF;
END$$
DELIMITER ;

-- suggestions for upgrading the database
-- 1. give special privilages to customers who are also employees
-- 2. refresh the wcount of the cash account at the end of the month
-- 3. proper structure for loans 
-- 4. NIC and identification details for persons
-- 5. Children accounts special format