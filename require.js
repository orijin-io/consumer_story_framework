require("ts-node/register");

require('@babel/register')({
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
});
require("@babel/polyfill");


