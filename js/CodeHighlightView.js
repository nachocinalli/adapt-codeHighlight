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
    _.defer(this.postRender.bind(this));
  }

  postRender() {
    // eslint-disable-next-line no-undef
    hljs.highlightElement(this.$('pre code')[0]);

    this.listenTo(Adapt, 'remove', this.remove);
  }
}

export default CodeHighlightView;
