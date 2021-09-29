import {Component} from 'react'
import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    setTerm = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.newTerm(term);
    }

    render() {
        return (
            <input type="text"
                    value={this.state.term}
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    onChange={this.setTerm}/>
        )
    }
}
