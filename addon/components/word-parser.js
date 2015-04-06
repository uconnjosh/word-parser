import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var input = this.get('input');
    console.log("input");
    console.log(input);
    init(input);
    // if (input) {this.init(input)};
  },
  rawWords: [],
  wordsObj: {},
  words: [],
  finalWords: [],
  sentences: [],
  full_sentences: [],
  root_weight: 0,
  excerpt: "",
  root: ""

});

  // WordTree = {  

init: function() {
  alert('howdy ho');
}

  