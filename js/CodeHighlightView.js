import { templates } from 'core/js/reactHelpers';
import React from 'react';
import ReactDOM from 'react-dom';
import Adapt from 'core/js/adapt';

class CodeHighlightView extends Backbone.View {
  className() {
    return 'code-highlight';
  }

  initialize() {
    this.render();
  }

  render() {
    ReactDOM.render(<templates.codeHighlight {...this.model.toJSON()} />, this.el);
    if (this.model.get('_codeHighlight')._codeFile) {
      this.listenTo(Adapt, 'codeHighlight:fileLoaded', this.onFileLoaded);

      return;
    }
    _.defer(this.postRender.bind(this));
  }

  onFileLoaded() {
    const el = this.$('pre code')[0];

    this.highlightElement(el);
  }

  highlightElement(el) {
    // eslint-disable-next-line no-undef
    hljs.highlightElement(el);
  }

  postRender() {
    this.listenTo(Adapt, 'remove', this.remove);

    const el = this.$('pre code')[0];
    if (!el) return;
    this.highlightElement(el);
  }
}

export default CodeHighlightView;
