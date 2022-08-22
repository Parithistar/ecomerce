import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from './pagination';
import { Modal, Button,TabContainer } from 'react-bootstrap'
import './product.css'

const Products =()=>{
    const showperpage= 10
    const [pagenation,setpagenation]=useState({
        start : 0,
        end: showperpage
    })

    const [alldata,setalldata]=useState([])
    const[data,setdata]=useState([])
    const [get,setget]=useState(true)
    const[show,setshow]=useState(false)
    const[pop,setpop]=useState({})
    const handleShow =()=>setshow(true);
    const handleClose =()=> setshow(false);
    useEffect(()=>{
        axios.get("https://api.npoint.io/74526212daacbe4a8032/item").then((data)=>{
            console.log(data.data)
            setdata(data.data)
            setalldata(data.data)
        })
    },[get])
    const onPaginationChange =(start,end)=>{
        setpagenation({start : start,end : end})
    }
    const selecthandler =(e)=>{
        if(e.target.value==="all"){
            setget(data)
        }else{
            const newdata = alldata.filter((item)=>{
                return item.category.includes(e.target.value)
            })
            setdata(newdata)
        }
    }
    const popuphandle = (item)=>{
        setpop(item)
        handleShow()
    }
    const popupclose = ()=>{
        handleClose()
    }
    return (
    <>
    <div className='heading'>
        <h1>Available Products</h1>
    </div>
    <div className='select' style={{float:"left",marginLeft:"10px"}}>
        <select onChange={(e)=>selecthandler(e)}>
        <option value="all">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Furniture">Furniture</option>
            <option value="Outdoor">Outdoor</option>
        </select>
    </div>
    <div className='body-container'>
        {data.slice(pagenation.start,pagenation.end).map((item,i)=>{
            return(
                <div key={i} className="image" onClick={()=>{popuphandle(item)}}>
                    <img src={item.item_image} alt="products" />
                </div>

            )
        })}
    </div>
    <div className='pagenation'>
        <Pagination style={{display: "flex"}}showPerPage ={showperpage} total = {data.length} onPaginationChange = {onPaginationChange}/>
      </div>
    <TabContainer style={{ marginLeft: "40%", marginTop: "10%", width: "700px", marginBottom: "10%",height: "300px", lineHeight: "25px", textAlign: "center" }}>
    <div id="divID" style={{overflowY:"scroll",}}></div>
    <Modal show={show} onHide={handleClose}  centered
          style={{ marginLeft: "30%", marginTop: "10%", width: "700px", marginBottom: "10%",height: "460px", lineHeight: "25px", textAlign: "center",}}>
            
        <div>
        < div classname="header" style={{height:"20px",marginBottom:"50px"}}>
        
            <Button style={{float :"right",background:"orange"}} onClick={()=>{popupclose()}} closebutton >close</Button>
            <Modal.Title  style={{float:"left"}}>{pop.category}</Modal.Title>
        </div>
          <Modal.Body>
             <div className='popup' style={{display:"flex",marginRight:"20px"}}>
               <span className='modalbody'style={{"textAlign":"left","marginLeft":"10px", "marginTop":"10px"}}>
                <img src={pop.item_image}  alt="popup" />
               </span>
               <span style={{"textAlign":"left","marginLeft":"10px", "marginTop":"10px"}}> 
                <div><span style={{"font-weight":"bold"}} >Desricption :</span></div> 
                <div ><span style={{"font-weight":"bold"}}>item_link:</span>{pop.item_link}</div>
                <div><span style={{"font-weight":"bold"}}>offer:</span><span>{pop.offer}</span></div>
                <div><span style={{"font-weight":"bold"}}>Reviews:</span><span>{pop.item_reviews}</span></div>
                </span>
             </div>
          </Modal.Body>
          </div>
          
        </Modal>
        </TabContainer>

    </>
    
    )
}
export default Products