INSERT INTO branch(City, Address)
VALUES
	("Moratuwa", "1st Lane, Katubadda"),
    ("Borella", "D.S.Senanayake Mawatha, Punchi Borella"),
    ("Anuradhapura", "1st Lane, Pooja Nagaraya"),
    ("Kandy", "2nd Lane, Kandy City Center"),
    ("Galle", "Galle Raod, Galle");
    
INSERT INTO customer(Name, dateofbirth, Address, Phone, occupation)
VALUES
	("A.L. Abeweera", '2000-04-01', "No: 2nd Lane, Bandaragama", '+94761234567', 'CS Engineer'),
    ("U.M. Wijesighe", '2000-03-02', "No: 45, Papiliyana, Boralesgamuwa", "+94764964790", 'Engineer'),
    ("Nimesh Ranchagoda", '2000-08-17', "No; 144, Angoda", "+94774964790", "Tennis Trainer"),
    ("Inuka Ampavila", '2000-10-16', "No: 15, Rathanapitiya, Boralesgamuwa", "+94774567891" ,"Shooter"),
    ("Radith Samarakoon", '1998-12-12', "No: 12, Galle Road, Mount Laviniya", "+94724561232", "Full Stack Developer");

INSERT INTO fdaccouttype(TypeID, Duration, Interestrate)
VALUES
	("F0613", 6, 13.0),
    ("F1214", 12, 14.0),
    ("F3615", 36, 15.0);

INSERT INTO cashaccouttype(TypeID, Type, Minimum, )
VALUES
	("C0", 12, 5.5),
    ("", 24, 6.5),
    ("FD", 36, 7.5),
    ("FD", 48, 8.5),
    ("FD", 60, 9.5);

INSERT INTO loantype(TypeID, InterestRate)
VALUES
    (),
    (),
    (),
    ();