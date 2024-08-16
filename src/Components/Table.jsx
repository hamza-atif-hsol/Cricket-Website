import React, { useState,useEffect } from 'react';
import axios from 'axios';



function Table() {
    const [data,setData]=useState([])
    async function fetchData(){
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
            params: {
              tags: 'vegetarian,dessert',
              number: '1'
            },
            headers: {
              'x-rapidapi-key': '057d313da7msh16fb45de74a4d08p15c3a1jsnd8095fb8720f',
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
          } catch (error) {
              console.error(error);
          }
        }
    useEffect(() => {
        
        fetchData();
        
      }, []);
  return (
    <div>
      <h3 className='table-heading'>Point Table</h3>
      <table className="table-styling-table">
        <thead className="table-styling">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Batting Style</th>
          </tr>
        </thead>
        <tbody className="table-styling">
          {/* {data.map((item, index) => (
            <tr className="table-styling" key={index}>
              <td>{item._id}</td>
              <td>{item.format}</td>
              <td>{item.matchStatus}</td>
              <td>{item.srs}</td>
            </tr>
          ))} */}
           <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr>
            <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr>
            <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr>
            <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr>
            <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr>
            <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr> <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr> <tr className="table-styling" >
              <td>12</td>
              <td>Batsman</td>
              <td>True</td>
              <td>Right Hand Batsman</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
