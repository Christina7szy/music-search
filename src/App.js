import React, { Component, Fragment} from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#fff'
};

let artist = '';
var artistData ='';


class ArtistSearch extends Component {
  constructor(props) {
    super(props);
    this.state={
      inputValue:"hello!",
      list:[]
    }
  }
handleInputChange(e){
    this.setState({
    })
    this.state.inputValue = e.target.value;
}


handleBtnClick(){
    artist = this.state.inputValue.toString();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
  if (!accessToken)
    return;
   fetch('https://api.spotify.com/v1/search?q='+artist+'&type=artist', {
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    headers: {'Authorization': 'Bearer ' + accessToken}
  }).then(response => response.json())
  .then(data => this.setState({list:[...data.artists.items]}))
}

render() {
  // this.state.user && 
  // this.state.playlists 
  //   ? this.state.playlists.filter(playlist => 
  //     playlist.name.toLowerCase().includes(
  //       this.state.filterString.toLowerCase())) 
  //   : []


      // var renderedOutput = (this.state.list[0] &&
      //                      this.state.list[0].images) ?
      //                      this.state.list.map(item => 
      //                       <div><img src = {item.images[1].url} /> <h1>{item.name}</h1></div>)
      //                       :[]
     var renderedOutput = this.state.list.map(item => 
                            <div>
                              {(item &&
                               item.images[1]) ?
                               <div><img src = {item.images[1].url} /> <h1>{item.name}</h1></div>
                               :[]}
                            </div>)
                
   
    return (
      <Fragment>
      <div>
          <input 
              value = {this.state.inputValue}
              onChange= {this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleBtnClick.bind(this)}>submit</button></div>
      {/* <ul>
           
          {console.log(this.state.list[1])}
      </ul> */}
      {(this.state.list[0] && this.state.list[0].images)? <div> {renderedOutput} </div> :[] }
      </Fragment>
    )
  }

}




class App extends Component {
  constructor() {
    
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

  }
  render() {
    let playlistToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())) 
        : []
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            I feel like searching for
          </h1>
          <ArtistSearch/>
        </div> : <button onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://music-search-backend.herokuapp.com/login' }
          }
          style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button>
        }
      </div>
      
    );
  }

}


export default App;