const firstNames = ['John','Chet','Relena','Bernie','Ezra','Robert','','Amuro','Heero','Eren','Wallace','Shrek','Barrack','Donald','George','Char','Casval','Gromit','Sayla','Bright','Remy','Linguini','Duo','Quattre','Matilda','Frau','Buzz','Luke','Darth','LeLouch','Lightning','Neo','Doc','Raleigh','Anne','Jed','Jethro','Maria','Justin','Martin','Frodo','Bilbo','Gandalf','Leia','Han','Nicholas'];
const lastNames = ['Aderhold','Trudea','Washington','Peacecraft','Obama','Wiseman','Trump','','Bush','Ray','Aznable','Deikun','Noa','Jaeger','Bo','ChatRoom','ChetRoom','Lightyear','Yuy','Aldrin','Skywalker','Vader','Kirk','Maxwell','Winner','LampeRouge','McQueen','Mater','Beckett','Shirley','OfGreenGables','TheRedComet','Clampett','VonTrapp','Baggins','Solo','Cage'];
function generateRandomUsername(){
    const randomFirstName = firstNames[Math.floor((Math.random() * firstNames.length))];
    const randomThirdName = lastNames[Math.floor((Math.random() * lastNames.length) )];
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomGeneratedName = `${randomFirstName}${randomThirdName}${randomNumber}`;
    return randomGeneratedName;
};
module.exports = {generateRandomUsername};