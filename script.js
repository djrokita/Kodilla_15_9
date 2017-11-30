class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      users: []
    };
  }
  onChangeHandle(event) {
    this.setState({
      searchText: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          users: responseJson.items
        })
      );
  }
  render() {
    return (
      <div>
        <header className="upper-bar">
          <div className="container">
            <Logo />
            <form
              className="form-group"
              onSubmit={event => this.onSubmit(event)}
            >
              <label htmlFor="searchText">Search by user name</label>
              <input
                type="text"
                id="searchText"
                onChange={event => this.onChangeHandle(event)}
                value={this.state.searchText}
              />
            </form>
          </div>
        </header>
        <UserList users={this.state.users} />
      </div>
    );
  }
}

class UserList extends React.Component {
  get users() {
    return this.props.users.map(item => <User user={item} key={item.id} />);
  }
  render() {
    return (
      <div className="container">
        <ul className="user-list">{this.users}</ul>
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <div className="user-item">
        <img src={this.props.user.avatar_url} style={{ maxWidth: "100px" }} />
        <a href={this.props.user.html_url} target="_blank">
          {this.props.user.login}
        </a>
      </div>
    );
  }
}

class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <i className="fa fa-github" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
