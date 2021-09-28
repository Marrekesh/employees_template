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
			]
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

	render() {

		const {data} = this.state

		return (
			<div className="app">
				<AppInfo />

				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>
				
				<EmployeesList 
				data={data}
				onDelete={this.onDelete}
				onToggle={this.onToggle}/>
				<EmployeesAddForm
				onAdd={this.onAdd}/>
			</div>
		);
	}

}


