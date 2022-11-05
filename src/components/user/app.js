// import React, { Component } from "react";
// import MenuBar from './menueBar';
// import MusicCard from './musicBar';
// import { db } from "./db";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { current: 1 };
//   }
//   next = action => {
//     let current = this.state.current;
//     if (action === "next") {
//       if (current === db.alternative.length) this.setState({ current: 1 });
//       else {
//         this.setState({ current: this.state.current + 1 });
//       }
//     } else {
//       if (current === 1) {
//         this.setState({ current: db.alternative.length });
//       } else {
//         this.setState({ current: this.state.current - 1 });
//       }
//     }
//   };
//   play = () => {
//     document.getElementById("video").src += "?autoplay=1";
//   };

//   render() {
//     return (
     
//       <div className="App"> 
//       <div className="card">
//         <MenuBar />
//         <MusicCard
//           data={db.alternative[this.state.current - 1]}
//           next={() => this.next()}
//           play={() => this.play()}
//         />
//         ;
//       </div>
//       </div>
//     );
//   }
// }

// export default App;
