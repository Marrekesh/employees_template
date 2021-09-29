import {Component} from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'John C.', salary: 800, increase: false, rise:false, id:1},
				{name: 'Alex M.', salary: 3000, increase: false, rise:false, id:2},
				{name: 'Carl W.', salary: 5000, increase: false, rise:false, id:3}
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 4
	}

	onDelete = (id) => {
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);

			const before = data.slice(0, index);
			const after = data.slice(index + 1);

			const newArr = [...before, ...after]

			return {
				data: newArr
			}
		})
	}

	onAdd = (name, salary) => {
		const newItem = {
			name: name,
			salary: salary,
			increase: false,
			rise:false,
			id: this.maxId++
		}

		this.setState(({data}) => {
			const newArr = [...data, newItem]

			return {
				data: newArr
			}
		})
	}

	onToggle = (id, prop) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [prop]: !item[prop]}
				}
				return item
			})
		}))
	}

	searchItem = (items, term) => {
		if (term.length === 0) {
			return items
		}

		return items.filter(item => {
			return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
		})
	}
	
	newTerm = (term) => {
		this.setState({term})
	}

	takeFilter = (filter) => {
		this.setState({filter})
	}

	tabFilter = (items, filter) => {
		switch(filter) {
			case 'rise':
				return items.filter(item => item.rise)
			case 'moreThan1000':
				return items.filter(item => item.salary > 1000)
			default:
				return items
		}
	}

	render() {
		const {data, term, filter} = this.state

		const employee = this.state.data.length;
		const increased = this.state.data.filter(item => item.increase).length

		const visibleItem = this.tabFilter(this.searchItem(data, term), filter)
		return (
			<div className="app">
				<AppInfo employee={employee} increased={increased}/>

				<div className="search-panel">
					<SearchPanel newTerm={this.newTerm}/>
					<AppFilter filter={filter} takeFilter={this.takeFilter}/>
				</div>
				
				<EmployeesList 
				data={visibleItem}
				onDelete={this.onDelete}
				onToggle={this.onToggle}/>
				<EmployeesAddForm
				onAdd={this.onAdd}/>
			</div>
		);
	}

}


