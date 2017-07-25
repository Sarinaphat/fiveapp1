import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }
  handleSearchChange = (value555) => {
    this.props.searchChange(value555);
  }
  handleInStockInputChange = (e) => {
    this.props.onInStockInput(e.target.checked);
  }
  handleSearchType = (searchtype) => {
     this.props.SearchType(searchtype);
  }
  handleCheckbox = (value) => {
    this.props.onJapanOnly(value);
  }
   handleCheckclass = (check) => {
     this.props.onEuroOnly(check);
   }
  render(){
    return (
      <thead>
      <tr>
        <td>
          <input type="search"
            onChange={(e)=>{this.handleSearchChange(e.target.value)}}
            value={this.props.defaultSearch} />
        </td>
        <td>
          <input type="search"
           onChange={(e)=>{this.handleSearchType(e.target.value)}}
           />
        </td>
        <td>
          <input
            type="checkbox" onChange={(e)=>this.handleCheckbox(e.target.checked)}
            checked={this.props.japanOnly}
          />
          Japan
          <input
            type="checkbox" onChange={(e)=>this.handleCheckclass(e.target.checked)}
            checked={this.props.euroOnly}
          />
          Euro
        </td>
      </tr>
      </thead>
    )
  }
}

class UserTable extends Component {
  constructor(props){
    super(props);


  }
  render(){
    console.log(this.props);
      return(
            <tbody>
            {
              this.props.data.map((item,i)=>{
                if(item.name.indexOf(this.props.search)>-1){
                  if(item.type.indexOf(this.props.type)>-1){

                    if(this.props.japanOnly && this.props.euroOnly){
                      return <tr key={i}><td>{item.name}</td> <td>{item.type}</td> <td>{item.class}</td></tr>
                    }else if(this.props.japanOnly){
                      if(item.class==="Japan"){
                        return <tr key={i}><td>{item.name}</td> <td> {item.type} </td> <td>{item.class}</td></tr>
                      }
                    }else if(this.props.euroOnly){
                      if(item.class==="Euro"){
                          return <tr key={i}><td>{item.name}</td> <td> {item.type} </td> <td>{item.class}</td></tr>
                      }
                    }else{
                      return <tr key={i}><td>{item.name}</td> <td> {item.type} </td> <td>{item.class}</td></tr>
                    }
                  }
                }
              })
            }
          </tbody>
      )
    }
  }

class FormAdd extends Component{
  constructor(props){
    super(props);
    this.state = {name:'',type:'',classD:''}
  }
  addNewData = () => {
    var {name,type,classD} = this.state;
    this.setState({name:'',type:'',classD:''})
    this.props.addNewData(name,type,classD);
  }
  render(){
    var {name,type,classD} = this.state;
    return(
      <tfoot>
        <tr>
          <td><input value={name} onChange={(e)=>this.setState({name:e.target.value})} /></td>
          <td><input value={type} onChange={(e)=>this.setState({type:e.target.value})} /></td>
          <td>
            <input value={classD} onChange={(e)=>this.setState({classD:e.target.value})} />
            <button onClick={()=>this.addNewData()}>Submit</button>
          </td>
        </tr>
      </tfoot>
    )
  }
}
class App extends Component {
    constructor(props){
      super(props);
      console.log(this.props);
      this.state = {search:'',japanOnly:false, type:'', euroOnly:false, data:this.props.data};
    }
    searchChange = (search) => {
      this.setState({search:search});
    }
    onJapanOnly = (value) => {
      this.setState({japanOnly:value});
    }
    typeSearch = (value) => {
      this.setState({type:value});
    }
    onEuroOnly = (value) =>{
      this.setState({euroOnly:value});
    }
    addNewData = (name,type,classD) => {
      console.log(name);
      console.log(type);
      console.log(classD);
      var tmp = this.state.data;
      tmp.push({name,type,class:classD});
      this.setState({data:tmp});
    }
    render(){
      return(
        <div>
          <table style={{border:'1px solid #222'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Class</th>
              </tr>
            </thead>
                  <SearchBar
                    onJapanOnly={this.onJapanOnly}
                    searchChange={this.searchChange}
                    SearchType={this.typeSearch}
                    japanOnly={this.state.japanOnly}
                    defaultSearch={this.state.search}
                    onEuroOnly={this.onEuroOnly}
                    euroOnly={this.state.euroOnly}
                    />

                  <UserTable
                    euroOnly={this.state.euroOnly}
                    type={this.state.type}
                    japanOnly={this.state.japanOnly}
                    search={this.state.search}
                    searchage={this.state.typeSearch}
                    data={this.state.data} />

                  <FormAdd addNewData={this.addNewData} />
          </table>
        </div>
      )
    }
  }

var DATA = [
  {name:"Honda",type:"Jazz", class:'Japan'},
  {name:"Honda",type:"City", class:'Japan'},
  {name:"Toyota",type:"Yaris", class:'Japan'},
  {name:"Toyota",type:"Revo", class:'Japan'},
  {name:"BMW",type:"M3", class:'Euro'}

]
ReactDOM.render(<App data={DATA} />, document.getElementById('root'));
