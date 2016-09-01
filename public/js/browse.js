
class FilterTable extends React.Component{
    constructor(props){
        super(props);
        // console.log(this.props.data);
    };
    render(){
        return (<ul className="list-group">
                <li className="list-group-item active">
                    Filter <span className="glyphicon glyphicon-menu-down pull-right" aria-hidden="true" />
                </li>
                <li className="list-group-item">
                    <p>
                        <strong>Subject:</strong> 
                        <select>
                          <option>Thai</option>
                          <option>English</option>
                        </select>
                    </p>
                    <p>
                        <strong>Class:</strong> 
                        <select>
                          <option>Kindergarden</option>
                          <option>Primary School</option>
                          <option>Secondary School</option>
                          <option>University</option>
                          <option>Activities</option>
                        </select>
                    </p>
                    <p>
                      <strong>Price:</strong>  <input type='text' value='0' size='5' /> - <input type='text' value='5000' size='5' />
                    </p>
                    <p>
                      <strong>Date:</strong><br /> <input type='checkbox' /> Monday <input type='checkbox' /> Tuesday 
                      <br /><input type='checkbox' /> Wednesday <input type='checkbox' /> Thrusday 
                      <br /><input type='checkbox' /> Friday <input type='checkbox' /> Saturday 
                      <br /><input type='checkbox' /> Sunday 
                    </p>
                    <p>
                      <strong>Gender:</strong>
                      <br /><input type='radio' name='gender' /> Male 
                      <input type='radio' name='gender' /> Female 
                    </p>
                    <p>
                      <strong>Location:</strong>
                      <br /><input type='checkbox' /> BTS Station
                      <br /><input type='checkbox' /> MRT Station
                      <br /><input type='checkbox' /> Siam
                      <br /><input type='checkbox' /> Silom
                      <br /><input type='checkbox' /> Home Tutor
                    </p>
                </li>
            </ul>);
    }
}

