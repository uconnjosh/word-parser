import Ember from 'ember';

export default Ember.Component.extend({
  // didInsertElement: function() {
  //   var input = this.get('input');
  //   console.log("input");
  //   console.log(input);
  //   init(input);
    
  // },
  rawWords: [],
  wordsObj: {},
  words: [],
  finalWords: [],
  sentences: [],
  full_sentences: [],
  root_weight: 0,
  excerpt: "",
  root: "",
  defaultInput: "",

  

  // WordTree = { 

  init: function(input) {
      var input = this.get('input') || this.get('defaultInput');
      alert(input);
      this.parseRoot(input);
      this.setExcerpt(input);
      this.parse_input(input, this.root);
      this.to_json();
      this.uniqueWords();
      return this;
  },
  parseRoot: function(input) {
  var words = input.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
      this.addWord(words[i], true)
    }
  },

  stopWords: function(word) {
    // to do, add languages
    var findStops = ["january","february","march","april","may","june","july","august","september","october","november","december","monday","tuesday","wednesday","thursday","friday","saturday","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","-","_","--","we've","we'll","we're","who'll","who've","who's","you'll","you've","you're","i'll","i've","i'm","i'd","he'll","he'd","he's","she'll","she'd","she's","it'll","it'd","it's","they've","they're","they'll","didn't","don't","can't","won't","isn't","wasn't","couldn't","should't","wouldn't","ve","ll","re","th","rd","st","doing","allow","examining","using","during","within","across","among","whether","especially","without","actually","another","am","because","cannot","the","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or","had","by","hot","word","but","what","some","we","yet","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","shall","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","no","most","my","over","know","than","call","first","who","may","down","side","been","now","find","any","new","part","take","get","place","made","where","after","back","little","only","came","show","every","good","me","our","under","upon","very","through","just","great","say","low","cause","much","mean","before","move","right","too","same","tell","does","set","three","want","well","also","small","end","put","hand","large","add","here","must","big","high","such","why","ask","men","went","kind","need","try","us","again","near","should","still","between","never","last","let","though","might","saw","left","late","run","don't","while","close","few","seem","next","got","always","those","both","often","thus","won't","not","into","inside","its","makes","tenth","trying","i","me","my","myself","we","us","our","ours","ourselves","you","your","yours","yourself","yourselves","he","him","his","himself","she","her","hers","herself","it","its","itself","they","them","their","theirs","themselves","what","which","who","whom","this","that","these","those","am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","will","would","shall","should","can","could","may","might","must","ought","i'm","you're","he's","she's","it's","we're","they're","i've","you've","we've","they've","i'd","you'd","he'd","she'd","we'd","they'd","i'll","you'll","he'll","she'll","we'll","they'll","isn't","aren't","wasn't","weren't","hasn't","haven't","hadn't","doesn't","don't","didn't","won't","wouldn't","shan't","shouldn't","can't","cannot","couldn't","mustn't","let's","that's","who's","what's","here's","there's","when's","where's","why's","how's","daren't","needn't","oughtn't","mightn't","a","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","to","from","up","down","in","out","off","over","under","again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such","nor","not","only","own","same","so","than","too","very","one","every","least","less","many","now","ever","never","say","says","said","also","get","go","goes","just","made","make","put","see","seen","whether","like","well","back","even","still","way","take","since","another","however","two","three","four","five","first","second","new","old","high","long",".",":",";",",","%","'tis","'twas","a","able","about","across","after","ain't","all","almost","also","am","among","an","and","any","are","aren't","as","at","be","because","been","but","by","can","can't","cannot","could","could've","couldn't","dear","did","didn't","do","does","doesn't","don't","either","else","ever","every","for","from","get","got","had","has","hasn't","have","he","he'd","he'll","he's","her","hers","him","his","how","how'd","how'll","how's","however","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","just","least","let","like","likely","may","me","might","might've","mightn't","most","must","must've","mustn't","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","shan't","she","she'd","she'll","she's","should","should've","shouldn't","since","so","some","than","that","that'll","that's","the","their","them","then","there","there's","these","they","they'd","they'll","they're","they've","this","tis","to","too","twas","us","wants","was","wasn't","we","we'd","we'll","we're","were","weren't","what","what'd","what's","when","when","when'd","when'll","when's","where","where'd","where'll","where's","which","while","who","who'd","who'll","who's","whom","why","why'd","why'll","why's","will","with","won't","would","would've","wouldn't","yet","you","you'd","you'll","you're","you've","your","'ve","'ll","'re","'s","'m","'d","'t","'tis","'twas", "?", "&"]
    if (findStops.indexOf(word) > -1) {
      return true;
    } else {
      return false;
    }
  },

  addWord: function(_word, find_root) {
    var _tword = _word.trim().toLowerCase();
    // todo add stop words here!!!!
    if (this.stopWords(_word)) {return};

    this.wordsObj[_tword] ? this.wordsObj[_tword] += 1 : this.wordsObj[_tword] = 1;
    this.full_sentences.push(_word);

    if (find_root && this.wordsObj[_word] >= this.root_weight) {
      this.root = _word
      this.root_weight = this.wordsObj[_word]
      this.rawWords.push(_word);
    } else {
      this.rawWords.push(_word);
    }
  },

  parse_split_eof: function(_sentence, _word, i, _root) {
    _sentence.push(_word);
    // if (_root) {
    //   this.add_word(_word);
    // }
    if (i > -1) {
      _sentence.push(String.fromCharCode(i));
    }
    // if (this.root.length > 0) {
    
    // }

    var _root_idx = _sentence.indexOf(this.root);

    // if (_root_idx > -1) {
    //   this.sentences.push(_sentence[1+_root_idx, _sentence.length]);
    // }

    this.sentences.push(_sentence);

  },

  parse_input: function(input, root) {
    var _word = " ";
    var _sentence = [];

    for (var i = 0; i < input.length; i++) {
      switch (input.charCodeAt(i)) {
        case 9:
        case 32:
          _sentence.push(_word);
          this.addWord(_word, false);
          _word = " ";
          break;

        case 33:
        case 46:
        case 59:
        case 63:
          this.parse_split_eof(_sentence, _word, input.charCodeAt(i), root);
          _sentence = [];
          break;

        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 47:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          _word = _word + input[i];
          break;
      }

    } 
  },

  uniqueWords: function() {
    // console.log('this words before unique:');
    // console.log(this.words);

    // this.words = $.unique(this.words);
    // console.log('this words after unique');
    // console.log(this.words);

    // var finalWords = [];
    // finalWords.push("dude, do you even fucking push?");

    var wordHolder = [];

    for (var i = 0; i < this.rawWords.length - 1; i++) {
      if (wordHolder.indexOf(this.rawWords[i]) < 1) {
        wordHolder.push(this.rawWords[i]);
      } 
    }

    window.wordHolder = wordHolder;

    for (var i = 0; i < wordHolder.length; i++) {
      console.log("pushing to final words!!");
      var word_obj = {text: wordHolder[i], weight: this.wordsObj[wordHolder[i]]}
      if (!word_obj.weight) {return};
      this.finalWords.push(word_obj);
    }

    window.finalWords = this.finalWords;

    // for (i = 0; i < this.finalWords.length; i++) {
    //   this.finalWords[i].weight = this.wordsObj[this.finalWords[i].text];
    // }

  },

  setExcerpt: function(input) {
    this.excerpt = input;
  }
// }
});

