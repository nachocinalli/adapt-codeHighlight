import Adapt from 'core/js/adapt';
import 'libraries/highlight';
import 'libraries/highlightjs-copy';
class CodeHighlight extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    const config = Adapt.course.get('_codeHighlight');
    if (!config?._isEnabled) return;
    // eslint-disable-next-line no-undef
    hljs.addPlugin(new CopyButtonPlugin());
    this.setUpEventListeners();

  }

  setUpEventListeners() {
    this.listenTo(Adapt, 'pageView:ready', this.highlightAll);
  }

  highlightAll() {
    // eslint-disable-next-line no-undef
    hljs.highlightAll();
    document.querySelectorAll('div.code-hljs').forEach((el) => {
      // eslint-disable-next-line no-undef
      hljs.highlightElement(el);
    });
  }
}

export default new CodeHighlight();
