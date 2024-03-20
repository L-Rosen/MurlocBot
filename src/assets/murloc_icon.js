const Canvas = require('@napi-rs/canvas');
const fs = require('fs');

async function murloc_icon(level, current_xp) {
    const max_xp = Math.round(0.8 * Math.pow(level + 1, 3)) - (Math.round(0.8 * Math.pow(level, 3) - 1));
    let xp = current_xp - (Math.round(0.8 * Math.pow(level, 3)) - 1);
    let percent = (xp / max_xp);

    if (level === 20) {//Si le joueur est level 20 on met le cercle complet car il n'y a pas de niveau supérieur
        percent = 1;
    }
    const min_angle = (7895373096733901 / 12666373951979520) * Math.PI;
    const max_angle = min_angle + percent * ((43 / 18) * Math.PI - min_angle);


    const canvas = Canvas.createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');

    const murloc_image = await Canvas.loadImage("./src/assets/murloc_asset.png");
    const border = await Canvas.loadImage("./src/assets/border/Level_" + level + ".webp");
    //On place l'image du murloc
    ctx.drawImage(murloc_image, 0, 0, 1000, 1000);

    //cercle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 293;

    //Cercle xp
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, min_angle, max_angle);
    ctx.strokeStyle = '#0594a8';
    ctx.lineWidth = 23;//23
    ctx.stroke();

    //On place le border
    ctx.drawImage(border, 0, 0, 1000, 1000);

    //On place le level
    ctx.font = '75 Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(level.toString(), 499.5, 791.5 + (75 / 2) - 5);

    //on enregistre l'image
    return canvas.toBuffer('image/png');


}

module.exports = {
    murloc_icon,
}



