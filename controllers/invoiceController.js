const Invoice = require('../models/invoice');
const Room = require('../models/room');

exports.index = async (req, res, next) => {
    const invoice = await Invoice.find().sort({ _id: -1 });

    res.status(200).json({
        data: invoice
    });
}

//get room
exports.room = async (req, res, next) => {
    const room = await Room.find().populate('invoice','-_id').sort('-_id');

    res.status(200).json({
        data: room
    });
}

//get room by id with invoice
exports.getInvoiceWithRoom = async (req, res, next) => {
    try {
     const { id } = req.params;
 
     const invoiceWithRoom = await Invoice.findById(id).populate('rooms');
 
     res.status(200).json({
         data: invoiceWithRoom
     });
 
    } catch (error) {
      next(error);   
    }
 }

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const staff = await Staff.findOne({ _id: id });
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: invoice
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
    const { title, cus_name, cus_address, cus_email, cus_tel, style, room } = req.body;

    // let invoice = new invoice(req.body);
    let invoice = new Invoice({
        title: title,
        cus_name: cus_name,
        cus_address: cus_address,
        cus_email: cus_email,
        cus_tel: cus_tel,
        style: style,
        room: room
    });
    await invoice.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
    });
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.deleteOne({_id: id});
        if (invoice.deletedCount === 0) {
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
        const { title, cus_name, cus_address, cus_email, cus_tel, style, room } = req.body;

        const invoice = await Invoice.updateOne({_id: id},{
            title: title,
            cus_name: cus_name,
            cus_address: cus_address,
            cus_email: cus_email,
            cus_tel: cus_tel,
            style: style,
            room: room
        });

        // console.log(invoice);
        if (invoice.nModified === 0) {
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