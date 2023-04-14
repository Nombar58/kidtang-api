const Room = require('../models/room');

exports.index = async (req, res, next) => {
    const room = await Room.find().sort({ _id: -1 });

    res.status(200).json({
        data: room
    });
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);
        if (!room) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: room
        });

    } catch (error) {
        res.status(400).json({
            error: {
                message: 'เกิดผิดพลาด ' + error.message
            } 
        });
    }
}

exports.insert = async (req, res, next) => {
    const { invoice, style, style_price, room_type, room_type_price, room_width, room_long, room_fur } = req.body;

    let room = new Room({
        invoice: invoice,
        style: style,
        style_price: style_price,
        room_type: room_type,
        room_type_price: room_type_price,
        room_width: room_width,
        room_long: room_long,
        room_fur: room_fur
    });
    await room.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
    });
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const room = await Room.deleteOne({_id: id});
        if (room.deletedCount === 0) {
            throw new Error('ไม่สามารถลบข้อมูลได้');
        } else {
            res.status(200).json({
                message: 'ลบข้อมูลเรียบร้อย'
            });
        }
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'เกิดผิดพลาด ' + error.message
            } 
        });
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { invoice, style, style_price, room_type, room_type_price, room_width, room_long, room_fur } = req.body;

        const room = await Room.updateOne({_id: id},{
            invoice: invoice,
            style: style,
            style_price: style_price,
            room_type: room_type,
            room_type_price: room_type_price,
            room_width: room_width,
            room_long: room_long,
            room_fur: room_fur
        });

        if (room.nModified === 0) {
            throw new Error('ไม่สามารถอัปเดตข้อมูลได้');
        } else {
            res.status(200).json({
                message: 'แก้ไขข้อมูลเรียบร้อย'
            });
        }
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'เกิดผิดพลาด ' + error.message
            } 
        });
    }
}