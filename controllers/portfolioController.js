const Portfolio = require('../models/portfolio');

exports.index = async (req, res, next) => {
    const portfolio = await Portfolio.find().sort({ _id: -1 });

    res.status(200).json({
        data: portfolio
    });
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const staff = await Staff.findOne({ _id: id });
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: portfolio
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
    const { title, images, maininfo } = req.body;

    // let portfolio = new Portfolio(req.body);
    let portfolio = new Portfolio({
        title: title,
        images: images,
        maininfo: maininfo,
    });
    await portfolio.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
    });
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const portfolio = await Portfolio.deleteOne({_id: id});
        if (portfolio.deletedCount === 0) {
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
        const { title, images, maininfo } = req.body;

        const portfolio = await Portfolio.updateOne({_id: id},{
            title: title,
            images: images,
            maininfo: maininfo,
        });

        // console.log(portfolio);
        if (portfolio.nModified === 0) {
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