import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggle}) => {
    const elements = data.map(item => {
        const {id, ...items} = item;
        return(
            <EmployeesListItem 
            key={id} 
            {...items}
            onDelete={() => onDelete(id)}
            onToggle={(e) => onToggle(id, e.currentTarget.getAttribute('data-toggle'))}/>
        )
    })

    return (
        <ul className="app-list list-group">
           {elements}
        </ul>
    )
}

export default EmployeesList;