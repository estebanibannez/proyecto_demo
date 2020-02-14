'use strict'

//-----------------------------------------------------------------------
const validarEmail = (email) => {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
    {
        return true;
    }
    else
    {
        return false;
    }
}

//-----------------------------------------------------------------------
const makeEmail = () => {
    var strValues="abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i=0;i<10;i++) {
            strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
            strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j=0;j<8;j++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"
    return strEmail;
}

//-----------------------------------------------------------------------
module.exports = {
    validarEmail,
    makeEmail
}