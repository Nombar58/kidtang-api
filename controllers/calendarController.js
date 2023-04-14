const Calendar = require('../models/calendar');

exports.index = async (req, res, next) => {
    const calendar = await Calendar.find().sort({ _id: -1 });

    res.status(200).json({
        data: calendar
    });
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const staff = await Staff.findOne({ _id: id });
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: calendar
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
    const { title, start, end, allday, extendedProps, description } = req.body;

    // let calendar = new calendar(req.body);
    let calendar = new Calendar({
        title: title,
        start: start,
        end: end,
        allday: allday,
        extendedProps: extendedProps,
        description: description
    });
    await calendar.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
    });
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const calendar = await Calendar.deleteOne({_id: id});
        if (calendar.deletedCount === 0) {
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
        const { title, start, end, allday, extendedProps, description } = req.body;

        const calendar = await Calendar.updateOne({_id: id},{
            title: title,
            start: start,
            end: end,
            allday: allday,
            extendedProps: extendedProps,
            description: description,
        });

        // console.log(calendar);
        if (calendar.nModified === 0) {
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