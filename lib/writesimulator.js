'use babel';

import WritesimulatorView from './writesimulator-view';
import { CompositeDisposable,  File } from 'atom';

export default {

  writesimulatorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.writesimulatorView = new WritesimulatorView(state.writesimulatorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.writesimulatorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'writesimulator:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.writesimulatorView.destroy();
  },

  serialize() {
    return {
      writesimulatorViewState: this.writesimulatorView.serialize()
    };
  },

  toggle() {


    let content  = "";
    let size = 0;
    let cursor = 0;
    let doing = true;

    let simulate = function(editor){
      let c = content[cursor] || null;
      if(c==null) return;
      if(doing==false) return;
      else{
        setTimeout(()=>{
          if(doing){
              editor.insertText(c, {
                autoIndent: false,
                autoIndentNewline: false,
                autoDecreaseIndent: false,
                normalizeLineEndings: false

              });
              cursor++;
              simulate(editor);
            }
        }, 10);


      }//end else
    };



    atom.workspace.observeTextEditors ((editor)=>{
        editor.onDidDestroy(()=>{
            doing = false;
        });
        content = editor.getText();
        size  = content.length;
        editor.setText("");
        simulate(editor);

    });


/*
      new File("/Users/lortmorris/repos/siss1.4/package.json").read()
      .then((content)=>{

          let size = content.length;
          let cursor = 0;

          let simulate = function(editor){
            let c = content[cursor++] || null;
            if(c==null) return;
            else{
              setTimeout(()=>{
                  editor.insertText(c, {
                    autoIndent: false,
                    autoIndentNewline: false,
                    autoDecreaseIndent: false,
                    normalizeLineEndings: false

                  });
                  simulate(editor);
              }, 10)

            }//end else
          };



      })

*/
      return this.modalPanel.hide();


  }

};
