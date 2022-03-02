const firstNames = ['Chet','Ezra','Robert','Amuro','Heero','Eren','Wallace','Shrek','Barrack','Donald','George','Char','Casval','Gromit','Sayla','Bright','Remy','Linguini','Matilda','Frau','Buzz','Luke','Darth'];
const middleNames = ['Bob','Chatter','Room','Mature','Immature','Noisy','Smart','Intelligent','The','Of','AffiliatedWith','UnaffiliatedWith','Representing','With','Without','','Plus'];
const lastNames = ['Aderhold','Obama','Trump','Bush','Ray','Aznable','Deikun','Noa','Jaeger','Bo','ChatRoom','ChetRoom','Lightyear','Aldrin','Skywalker','Vader'];
function generateRandomUsername(){
    const randomFirstName = firstNames[Math.floor((Math.random() * firstNames.length))];
    const randomSecondName = middleNames[Math.floor((Math.random() * middleNames.length))];
    const randomThirdName = lastNames[Math.floor((Math.random() * lastNames.length) )];
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomGeneratedName = `${randomFirstName}${randomSecondName}${randomThirdName}${randomNumber}`;
    return randomGeneratedName;
};
module.exports = {generateRandomUsername};