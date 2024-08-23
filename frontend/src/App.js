import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Blog Application</h1>
        </header>
        <main className="app-main">
          <Switch>
            <Route path="/" exact component={PostList} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route path="/new" component={NewPost} />
            <Route path="/edit/:id" component={EditPost} />
          </Switch>
        </main>
        <footer className="app-footer">
          <p>Blog Application © 2024</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
