var fs = require("fs");
var _ = require("underscore");


replaceUmlauts = function(s) {
    var tr = {"ä":"ae", "ü":"ue", "ö":"oe", "ß":"ss" }
    /*for(var letter in tr){
        s = s.replace(letter, tr[letter]);
    }*/
    return s.replace(/[äöüß]/g, function($0) { return tr[$0] })
}



var xkcdPW = function(){
    var numWords = 3;
    var seperator = ["+",","," ","_", ".", "/"]
    var concatPw = []
    var maxWordlen = 8;
    var insertNum = true;
    var wordList, lnCount, usedSeperator;

    fs.readFile('./openthesaurus.txt', {encoding: "utf8"}, function(err, bunchOfWords){
        if (err) throw err;

        var bunchOfWords = bunchOfWords.replace("\n", "");

        wordList = bunchOfWords.split(";");
        lnCount = wordList.length;
        usedSeperator = _.sample(seperator);

        while(concatPw.length < numWords){
            var idx = Math.floor(Math.random() * lnCount);
            var w = wordList[idx];
            w = replaceUmlauts(w);
            if(w.length <= maxWordlen){
                concatPw.push(w)
            }
        }
        if(insertNum){
            concatPw.push(_.random(0,100))
        }

        concatPw = _.shuffle(concatPw);
        console.log(concatPw.join(usedSeperator))

    })
}

_(1).times(function(){xkcdPW()})