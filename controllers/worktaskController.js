const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const { Storage } = require('@google-cloud/storage');
const stream = require('stream');
const config = require('../config/index');

const Work = require('../models/work');
const Job = require('../models/job');

exports.index = async (req, res, next) => {
    
    const works = await Work.find();

    const workWithJob = await works.map( (work, index) => {
        return {
            id: work._id,
            user_id: work.user_id,
            work_title: work.work_title,
            start: work.start,
            end: work.end,
            work_status: work.work_status,
            vdo_link: work.vdo_link,
            work_remark: work.work_remark,
        }
    });
    
    res.status(200).json({
        data: workWithJob
    });
}

//get job
exports.job = async (req, res, next) => {
    const job = await Job.find().populate('work','job_title subcon_id start end job_status -_id').sort('-_id');

    res.status(200).json({
        data: job
    });
}

//get work by id with job
exports.getWorkWithJob = async (req, res, next) => {
   try {
    const { id } = req.params;

    const workWithJob = await Work.findById(id).populate('jobs');

    res.status(200).json({
        data: workWithJob
    });

   } catch (error) {
     next(error);   
   }
}

//insert work
exports.insert = async (req, res, next) => {
    const { work_title, start, end, work_status, vdo_link, work_remark } = req.body;

    let work = new Work({
        work_title: work_title,
        start: start,
        end: end,
        work_status: work_status,
        vdo_link: vdo_link,
        work_remark: work_remark,
    });

   await work.save();

    res.status(201).json({
        message: 'เพิ่มข้อมูลงานเรียบร้อย'
    });
}


async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

async function saveImageToGoogle(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
   // console.log(ext);

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(image.data, 'base64'));

    // Creates a client and upload to storage
    const storage = new Storage({
       projectId: 'enhanced-idiom-112215',
       keyFilename: `${projectPath}/google_key.json`
    });

    const myBucket = storage.bucket('codingthialand_node_course');
    var myBucketFilename = myBucket.file(filename); 
    bufferStream.pipe(myBucketFilename.createWriteStream({
       gzip: true,
       contentType:  image.type,
       metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
      public: true,
      validation: "md5"
    }).on('error', (err) => {
        console.log('err =>' + err);
    }).on('finish', () => {
        console.log('upload successfully...');
    }));

    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}