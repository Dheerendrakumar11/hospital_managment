const connection = require('../../Model/db_connection')

const getRoom = (req,res)=>{

    sqlQuerry = "select * from tbl_hptl_room"

    connection.query(sqlQuerry,(error,result)=>{

        if(error){
            res.json(error)
        }
        else{
            res.json(result)
        }
    })
}
const getRoom_no = (req,res)=>{
    
      
    const room_no = req.params.room_no
    const sqlQuerry = "SELECT * FROM tbl_hptl_room WHERE room_no  = ? "
    
    connection.query(sqlQuerry,room_no,(error,result)=>{
        
        if(error){
            res.json(error)
        }
        else{
            res.json(result)
        }
    })
}

const postRoom = (req,res)=>{

    const roomData = req.body
    const sqlQuerry="INSERT INTO tbl_hptl_room set ?"

    connection.query(sqlQuerry,roomData,(error,result)=>{

             if(error){
                res.json(error)
             }
             else{
                res.json(result)
             }
    })

}

const putRoom = (req,res)=>{

    const roomData = [req.body,req.params.room_no]
    const sqlQuerry = 'UPDATE tbl_hptl_room SET ? WHERE room_no = ?'

    connection.query(sqlQuerry,roomData,(error,result)=>{

   if(error){
    res.json(error)
   }
   else{
    res.json(result)
   }


    })
}

const deleteRoom  = (req,res)=>{
      
    const deleteData = [req.params.room_no];

    const sqlQuery = "DELETE FROM tbl_hptl_room WHERE room_no = ?"
    

    connection.query(sqlQuery,deleteData,(error,result)=>{
        if(error){
            res.json(error)
        }
        else{
            res.json(result)
        }
    })
}
module.exports = {getRoom,getRoom_no,postRoom,putRoom,deleteRoom}