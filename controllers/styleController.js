const Style = require('../models/style');

exports.index = async (req, res, next) => {
    const style = await Style.find().sort({ _id: -1 });

    res.status(200).json({
        data: style
    });
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const style = await Style.findById(id);
        if (!style) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: style
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
    const { style_name, style_price } = req.body;

    let style = new Style({
        style_name: style_name,
        style_price: style_price
    });
    await style.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
    });
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const style = await Style.deleteOne({_id: id});
        if (style.deletedCount === 0) {
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
        const { style_name, style_price } = req.body;

        const style = await Style.updateOne({_id: id},{
            style_name: style_name,
            style_price: style_price
        });

        if (style.nModified === 0) {
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