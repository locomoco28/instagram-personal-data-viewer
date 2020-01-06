'use strict';

const e = React.createElement;

class Home extends React.Component {
    render() {
        return e('div', { className: 'pHome' }, e('p', {}, 'Home'));
    }
}

class Settings extends React.Component {
    render() {
        return e('div', { className: 'pSettings' }, e('p', {}, 'Settings'));
    }
}

class SelectFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    handleUpdate = async e => {
        e.preventDefault();
        this.setState({ loading: true });
        var files = e.target.files;
        var data = [];
        var err = '';
        for (var i = 0; i < files.length; i++) {
            var ext = /\.[0-9a-z]+$/i.exec(files[i].name);
            if (ext == '.zip') data.push(files[i].path);
            else
                err += `File "${files[i].name}" has an invalid format ("${ext}" instead of ".zip")<br/>`;
        }
        if (err != '') {
            M.toast({ html: err, classes: 'error', displayLength: 16000 });
        }
        if (data.length > 0) {
            console.log(data);
            var resp = await window.getFileData(data);

            // resp = data
            // TODO: insert data into fields (plain js)
            console.log('data updated', JSON.stringify(resp).length);
        } else {
            M.toast({
                html: 'No valid files were passed',
                classes: 'error',
                displayLength: 16000
            });
            err = 'No files were passed';
        }
        this.setState({ loading: false });
        this.props.updateSelectedFiles(err == '');
    };

    render() {
        return this.state.loading
            ? e('p', {}, 'loading')
            : e('input', {
                  id: 'f',
                  type: 'file',
                  multiple: true,
                  onChange: this.handleUpdate
              });
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: e(SelectFile, {
                updateSelectedFiles: (state = true) => {
                    this.setState({
                        filesSelected: state || true,
                        activePage: e(Home)
                    });
                }
            }),
            filesSelected: false
        };
    }

    // TODO: UI
    render() {
        return e(
            'div',
            { id: 'app' },
            e(
                'div',
                { id: 'views' },
                this.state.filesSelected
                    ? e(
                          'ul',
                          {},
                          e(
                              'li',
                              {
                                  onClick: () => {
                                      this.setState({ activePage: e(Home) });
                                  }
                              },
                              'Home'
                          ),
                          e(
                              'li',
                              {
                                  onClick: () => {
                                      this.setState({
                                          activePage: e(Settings)
                                      });
                                  }
                              },
                              'Settings'
                          )
                      )
                    : e('h2', {}, 'Please Select File')
            ),
            e('div', { id: 'page' }, this.state.activePage)
        );
    }
}

const domContainer = document.querySelector('#main');
ReactDOM.render(e(Main), domContainer);
