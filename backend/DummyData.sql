INSERT INTO branch(BranchID, City, Address)
VALUES
	("CO001", "Moratuwa", "1st Lane, Katubadda"),
    ("CO002", "Borella", "D.S.Senanayake Mawatha, Punchi Borella"),
    ("AN001", "Anuradhapura", "1st Lane, Pooja Nagaraya"),
    ("KA001", "Kandy", "2nd Lane, Kandy City Center"),
    ("GA001", "Galle", "Galle Raod, Galle");
    
INSERT INTO customer(CustomerID, Name, dateofbirth, Address, Phone, occupation)
VALUES
	("AL001", "A.L. Abeweera", '2000-04-01', "No: 2nd Lane, Bandaragama", '+94761234567', 'CS Engineer'),
    ("UM001", "U.M. Wijesighe", '2000-03-02', "No: 45, Papiliyana, Boralesgamuwa", "+94764964790", 'Engineer'),
    ("NR001", "Nimesh Ranchagoda", '2000-08-17', "No; 144, Angoda", "+94774964790", "Tennis Trainer"),
    ("IA001", "Inuka Ampavila", '2000-10-16', "No: 15, Rathanapitiya, Boralesgamuwa", "+94774567891" ,"Shooter"),
    ("RS001", "Radith Samarakoon", '1998-12-12', "No: 12, Galle Road, Mount Laviniya", "+94724561232", "Full Stack Developer");
    
INSERT INTO fdaccouttype(TypeID, Duration, Interestrate)
VALUES
	("FD")