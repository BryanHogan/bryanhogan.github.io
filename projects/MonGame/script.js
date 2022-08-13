let gameState;

const friendlyMon = { friendlyMonMaxHP: 0, friendlyMonAttack: 0 };
const enemyMon = { enemyMonMaxHP: 0, enemyMonAttack: 0 };

let gameLoopId;

document.getElementById("reroll-stats").addEventListener("click", rerollStatsFriendlyMon);
document.getElementById("start-fight").addEventListener("click", startCombat);

function rerollStatsFriendlyMon() {
    friendlyMon.friendlyMonMaxHP = Math.round((Math.random() * 30));
    friendlyMon.friendlyMonAttack = Math.round((Math.random() * 7 + 3));
    console.log(friendlyMon.friendlyMonMaxHP);
    console.log(friendlyMon.friendlyMonAttack);
    document.getElementById("friendlyMonMaxHPDisplay").innerHTML = friendlyMon.friendlyMonMaxHP;
    document.getElementById("friendlyMonAttackDisplay").innerHTML = friendlyMon.friendlyMonAttack;
    console.log("hi");
}
function startCombat() {
    console.log("did it work?");
    enemyMon.enemyMonMaxHP = Math.round((Math.random() * 20));
    enemyMon.enemyMonAttack = Math.round((Math.random() * 5 + 2));
    gameLoopId = setInterval(gameLoop, 2000);
}
function gameLoop() {
    console.log("game loop start");
    enemyMon.enemyMonMaxHP -= friendlyMon.friendlyMonAttack;
    if (enemyMon.enemyMonMaxHP <= 0) {
        document.getElementById("post-combat-message").innerHTML = "You won!";
        clearInterval(gameLoopId);
    }
    friendlyMon.friendlyMonMaxHP -= enemyMon.enemyMonAttack;
    if (friendlyMon.friendlyMonMaxHP <= 0) {
        document.getElementById("post-combat-message").innerHTML = "You lost!";
        clearInterval(gameLoopId);
    }
    console.log(friendlyMon);
    console.log(enemyMon);
}
