const Roomtype = require('../models/room_type');

exports.index = async (req, res, next) => {
    const roomtype = await Roomtype.find().sort({ _id: -1 });

    res.status(200).json({
        data: roomtype
    });
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const roomtype = await Roomtype.findById(id);
        if (!roomtype) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: roomtype
        });

    } catch (error) {
        res.status(400).json({
            error: {
                message: 'เกิดผิดพลาด ' + error.message
            } 
        });
    }
}