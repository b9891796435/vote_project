-- SELECT vote.cid,
--     cname,
--     count(*) AS votes
-- from vote
--     LEFT JOIN candidate ON vote.cid = candidate.cid
-- GROUP BY cid;
-- SELECT * FROM user WHERE username = 'diana' AND password = 'hopefuldreamer';
INSERT INTO vote (cid,uid) VALUES (3,10)