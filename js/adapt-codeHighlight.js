import Adapt from 'core/js/adapt';
import CodeHighlightView from './CodeHighlightView';
import 'libraries/highlight';
import 'libraries/highlightjs-copy';
class CodeHighlight extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    if (!this.checkIsEnabled(Adapt.course)) {
      return;
    }
    const _activeLanguage = Adapt.course.get('_activeLanguage') || 'en';
    // eslint-disable-next-line no-undef
    hljs.addPlugin(new CopyButtonPlugin({ lang: _activeLanguage }));
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    // this.listenTo(Adapt, 'pageView:ready', this.highlightAll);
    this.listenTo(Adapt, {
      'blockView:postRender': this.onRender,
      'componentView:postRender': this.onRender
    });
  }

  onRender(view) {
    const model = view.model;
    if (!this.checkIsEnabled(model)) {
      return;
    }
    const type = model.get('_type');

    const suffix = ['component, block'].includes(type) ? '__inner' : '__header-inner';
    const selector = `.${type}${suffix}`;

    const codeHighlightView = new CodeHighlightView({
      model
    }).$el;

    view.$(selector).append(codeHighlightView);
  }

  checkIsEnabled(model) {
    const _model = model.get('_codeHighlight');
    if (!_model || !_model._isEnabled) return false;
    return true;
  }
}

export default new CodeHighlight();
