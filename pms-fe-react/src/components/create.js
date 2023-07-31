import { useRef } from 'react';
import {Link} from 'react-router-dom';

function Create()
{
    /*to read form data ,create blank object first and create function which accepts prop and value,and later function stores data in blank object.*/
    let product={};
    //to reset form after button clicked
    let formv=useRef();

    function readVal(prop,val)
    {
        product[prop]=val;
    }
    //to send object to backend after reading data from form we use fetch
    function createProd()
    {
       fetch("http://localhost:8000/products",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify(product)
        })
       .then((res)=>res.json())
       .then((data)=>{
             
             if(data.success===true)
             {
                formv.current.reset();
             }
           
       })
       .catch((err)=>{
        console.log(err);
       })
    }


    return(
        <div className="container">
                <div className="header">
                   <h1 className="title">Add Products</h1>
                   <Link to="/products">
                      <button className="btn btn-primary">View Products</button>
                    </Link>
                </div>

                <form className='form-container mt-5' ref={formv}>
                    
                    <input type="number" placeholder="Enter Id" className='form-control' onChange={(event)=>{
                        readVal("id",Number(event.target.value));
                    }}/>
                    <input type="text"   placeholder="Enter Name" className='form-control' onChange={(event)=>{
                        readVal("name",event.target.value);
                    }}/>
                    <input type="number" placeholder="Enter Price" className='form-control' onChange={(event)=>{
                        readVal("price",Number(event.target.value));
                    }}/>
                    <input type="number" placeholder="Enter Quantity" className='form-control' onChange={(event)=>{
                        readVal("quantity",Number(event.target.value));
                    }}/>

                    <button type='button' className='btn btn-primary' onClick={createProd}>Create Product</button>

                </form>

         </div>  

    )
}

export default Create;