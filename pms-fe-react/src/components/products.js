import { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom';

function Product()
{
   //to store data in state variable inside empty array after the fetch api call .
   let [products,setProducts]=useState([]);
   //state variable can have only one argument and to open or close custom-modal.
   let [modVis,setModVis]=useState(false);
   let [messageVis,setMesVis]=useState(false);
   let [message,setMes]=useState({text:"I am a Message",typeClass:"success"});
   //simple useref variable created to hold blank object and to store the data in blank obj when u click edit icon.
   let product=useRef({});

   useEffect(()=>{
     
      fetch("http://localhost:8000/products")
      .then((res)=>res.json())
      .then((data)=>{
         setProducts(data);
      })
      .catch((err)=>{
        console.log(err);
      })  

   },[])

   /*to delete the product when u click delete icon(it sends product id),that u need to send to backend*/
   function delPro(id)
   {
      fetch("http://localhost:8000/products?id="+id,{
        method:"DELETE"
      })
      .then((res)=>res.json())
      .then((data)=>{
           /*to delete product in frontend array using splice and to display the new data,copy state var data into temp var*/
          /*we use spread operator to copy actual array not based on address reference.*/ 
           if(data.success===true)
           {
                let tempProd=[...products];
                let intodDel=tempProd.findIndex((p,i)=>{
                  return Number(p.id)===Number(id);
                  })
                  tempProd.splice(intodDel,1);
                  setProducts(tempProd);
           }
           else
           {
              console.log(data.message);
           }
      })
      .catch((err)=>{
        console.log(err);
      })
   }

   function setUpd(pro)
   {
      setModVis(true);
      product.current=pro;
   }

   function readVa(property,val)
   {
      product.current[property]=val;
   }
   
   /*to update form value in backend*/ 
   function updPro()
   {
      fetch(`http://localhost:8000/products?id=${product.current.id}`,{
           method:"PUT",
           headers:{
             "Content-Type":"application/json"
           },
           body:JSON.stringify(product.current)
      })
      .then((res)=>res.json())
      .then((data)=>{

         setModVis(false);//component re-rendered due to this.
         setMesVis(true);

         if(data.success===true)
         {
           setMes({text:data.message,typeClass:"success"});
         }
         else{
            setMes({text:data.message,typeClass:"error"});
         }
         //to close notification
         setTimeout(()=>{
            setMesVis(false);
         },3000)

      })
      .catch((err)=>{
         console.log(err);
      })
   }

   return (
        <div className="container">
              {/* toast class in bootstrap*/}
              
              {
                  messageVis===true?(
                     <div className={"custom-toast "+message.typeClass}>
                         {message.text}
                      </div>
                  )
                  :
                  null
              }    

               { /*when modVis is true,open the custom-modal,otherwise null*/ }
             
              {
                     modVis===true?(

                        <div className="custom-modal">

                           <div className="updform">
                     {/*in react we use defaultValue={} to send data from form to custom-modal variable */}
                               <input type="number" placeholder="Enter Id" defaultValue={product.current.id} className='form-control'
                                  onChange={(event)=>{
                                    readVa("id",event.target.value)
                                  }}/>
                               <input type="text"   placeholder="Enter Name" defaultValue={product.current.name} className='form-control'
                                 onChange={(event)=>{
                                    readVa("name",event.target.value)
                                  }}/>
                               <input type="number" placeholder="Enter Price" defaultValue={product.current.price} className='form-control'
                                 onChange={(event)=>{
                                    readVa("price",event.target.value)
                                  }}/>
                               <input type="number" placeholder="Enter Quantity" defaultValue={product.current.quantity} className='form-control'
                                 onChange={(event)=>{
                                    readVa("quantity",event.target.value)
                                  }}/>
                               
                               <button type='button' className='btn btn-primary' onClick={updPro}>Update Product</button>


                           </div>

                        </div>
           

                     )
                     :
                     null

              }
             
             

             <div className="header">
                  <h1 className="title">All Products</h1>
                  <Link to="/create">
                    <button className="btn btn-primary">Create Product</button>
                  </Link>
             </div>
             
             <table className="table mt-5">
                  <thead>
                     <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        products.map((p,i)=>{
                            return (
                                <tr key={i}>{/*to avoid key error we pass key here*/}
                                  <td>{i+1}</td>
                                  <td>{p.name}</td>
                                  <td>{p.price}</td>
                                  <td>{p.quantity}</td>
                                  <td>
                                    <i className="fa-solid fa-file-pen text-success me-2" onClick={()=>{
                                             setUpd(p)
                                        }}></i>
                                    <i className="fa-solid fa-trash-can text-danger" onClick={()=>{
                                             delPro(p.id)
                                        }}></i>
                                  </td>
                                </tr>
                            )
                        })
                     }
                  </tbody>
             </table>
        </div>
    )
}

export default Product;