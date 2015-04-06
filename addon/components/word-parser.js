import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var input = this.get('input');
    console.log("input");
    console.log(input);
    if (input) {var parsedText = TextParser.init(input)}
    

    // if (input) {this.init(input)};
  }
// }
});
