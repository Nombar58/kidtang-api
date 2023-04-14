const Job = require('../models/job');

exports.index = async (req, res, next) => {
    const job = await Job.find().sort({ _id: -1 });

    res.status(200).json({
        data: job
    });
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            throw new Error('ไม่พบข้อมูล');
        }

        res.status(200).json({
            data: job
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
    const { job_title, subcon_id, start, end, job_status, work } = req.body;

    let job = new Job({
        job_title: job_title,
        subcon_id: subcon_id,
        start: start,
        end: end,
        job_status: job_status,
        work: work
    });
    await job.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลเรียบร้อย'
    });
}

exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Job.deleteOne({_id: id});
        if (job.deletedCount === 0) {
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
        const { job_title, subcon_id, start, end, job_status, work } = req.body;

        const job = await Job.updateOne({_id: id},{
            job_title: job_title,
            subcon_id: subcon_id,
            start: start,
            end: end,
            job_status: job_status,
            work: work
        });

        if (job.nModified === 0) {
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