import React from "react";
import MediaCard from './item/item'
import Filter from './ui/Select'

import axios from 'axios';
import findDuplicates from './utils/nonuniqids'

export default class Main extends React.Component {
    constructor() {
        super()
    
        this.filterByName = this.filterByName.bind(this)
        this.filterByCountry = this.filterByCountry.bind(this)
      }
    state = {
        competitions: [],
        countries: [],
        names: [],
        filteredByName: [],
        filteredbyCountry: [],
        error: null
      }

     

      filterByName = (event) => {
          let name = event.target.value
          let filteredByName = this.state.competitions.filter(el => el.name === name)
          this.setState({filteredByName})
          
      }
      filterByCountry = (event)=>{
        let name = event.target.value
        let filteredbyCountry = this.state.competitions.filter(el => el.area.name === name)
        this.setState({filteredbyCountry})
        
      }

    

    componentDidMount()  {
        const self = this;
         return axios.get('http://localhost:8000/api/competitions')
        .then(function (res) {  
          const competitions = res.data.competitions
          let set = new Set()
          let names =[];
          competitions.map(el=>names.push(el.name))
          competitions.map(el => set.add(el.area.name))
          let countries = Array.from(set)
          
          self.setState({ competitions, countries, names });         
        })
        .catch(() => { this.setState({ error: 'No Data' })})   
    }
      render() {
        const { competitions , filteredByName, filteredbyCountry } = this.state
        let allfiltered = []
        let filters = 'all';
        if (filteredByName.length>0){
            filters = "name"
        } else if (filteredbyCountry.length>0){
            filters = "country"
        }  
        
        if (filteredbyCountry.length>0&&filteredByName.length>0){
            let idsByCountry = filteredbyCountry.map(el => el.id)
            let idsByName = filteredByName.map(el => el.id)
            let idsAll = idsByCountry.concat(idsByName)
            let nonUniqId = findDuplicates(idsAll)
            allfiltered = competitions.filter(competition => nonUniqId.includes(competition.id))
            filters='allfilters'
        }

        return (
            
            <React.Fragment>
               <div style = {{ justifyContent: "space-evenly",  
                            alignItems: "center",
                            display: "flex",
                             flexDirection: "row"}}>
                    <Filter filterby="Name" elements={this.state.names} onChange={this.filterByName}></Filter>
                    <Filter filterby="Country" elements={this.state.countries} onChange={this.filterByCountry}></Filter>
               </div>

               {(() => {
                    switch (filters) {
                        case 'all':
                
                        return <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
                        { competitions.map(competition =>
                            <MediaCard name={competition.name}
                            key={competition.id}
                            id={competition.id}
                            country = {competition.area.name}
                            ></MediaCard>)}
                        </div>
                        
                         case 'name':
                        return <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
                        {  
                            filteredByName.map(filter =>
                            <MediaCard name={filter.name}
                            key={filter.id}
                            country = {filter.area.name}
                            ></MediaCard>)}
                        </div>
                        case 'country':
                        return <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
                        { filteredbyCountry.map(competition =>
                            <MediaCard name={competition.name}
                            key={competition.id}
                            country = {competition.area.name}
                            ></MediaCard>)}
                        </div>
                        case 'allfilters':
                        return <div>
                        { allfiltered.map(el =>
                            <MediaCard name={el.name}
                            key={el.id}
                            country = {el.area.name}
                            ></MediaCard>)}
                        </div>
                        default: break
                    }
    })()}

                   
                 

            </React.Fragment>
           
        )
      }


}

