import React from 'react';
import ReactDOM from 'react-dom';

const TodoList = () => {
    const items = ['Drink Coffee', 'Build Awesome App'];
    return (
    <ul>
        <li>Learn React</li>
        <li>Build Awesome App</li>
    </ul>
    );
};

const AppHeader = () => {
    return <h1>My Todo List</h1>;
};

const App = () => {
    return (
    <div>
        
        <AppHeader />
        <SearchPanel />
        <TodoList />
    </div>
    );
};

const SearchPanel = () => {
    return <input placeholder="search" />;
};

ReactDOM.render(<App />, 
    document.getElementById('root'));