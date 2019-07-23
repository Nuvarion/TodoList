import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from  '../item-add-form';

import './app.css';
// import SampleBg from './sample.jpg';

export default class App extends Component {

    maxId = 100; 

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'active' 
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            
            const newArray = [
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    onAddItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            };
        });
    };

    toggleProperty(arr, id, propName) {
        
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem, 
            [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
                
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
            .toLowerCase().indexOf(term) > -1;
        });
    };

    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        };
    };

    render() {
        
        const { todoData, term, filter } = this.state;

        const searchedItems = this.search(todoData, term)

        const visibleItems = this.filter(searchedItems, filter);

        const doneCount = todoData
                            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        // const doneArray = todoData.filter((el) => el.done);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter  
                    filter={filter}
                    onFilterChange={this.onFilterChange} />

                </div>
                <TodoList 
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />

                {/* <img src={SampleBg}/> */}
                <ItemAddForm  onAddItem={ this.onAddItem }/>
            </div>
            );
    };
};
