/*
    Dog Tag Engine
    Author: David Frendin <david.frendin@gmail.com> (https://github.com/DavidFrendin/dog-tag-engine/)
    License: MIT
*/

class Settings
{
    graphics =
    {
        fxaa: false,
        shaderprecision: 'highp', //highp, mediump, lowp
        gamma: 2.2,
        shadows: 'soft', //basic, pcf, soft, vsm
        tonemap: false, //false, linear, reinhard, uncharted2, cineon, aces
        exposure: 1,
        whitepoint: 1,
    };

    web = 
    {
        base_href: './'
    }

}

export {Settings};