const express = require('express')

const hptl_roomRouter = express.Router()

const {getRoom,getRoom_no,postRoom,putRoom,deleteRoom} = require('../../Controller/hptl_room_controller/room_controller')

hptl_roomRouter.get('/room',getRoom)
hptl_roomRouter.get('/room/byid/:room_no',getRoom_no)
hptl_roomRouter.post('/room/send',postRoom)
hptl_roomRouter.put('/room/update/:room_no',putRoom)
hptl_roomRouter.delete('/room/delete/:room_no',deleteRoom)
module.exports = {hptl_roomRouter}