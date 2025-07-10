import Bootcamp from "../models/Bootcamp.js";


// @desc.      Get all bootcamps
// @route.     GET /api/v1/bootcamps
// @access.    Public
export async function getBootCamps(req, res, next) {
    try{
        const bootcamps = await Bootcamp.find();
        res.status(200).json({ success: true, data: bootcamps });
    } catch(err) {
        res.status(400).json({ success: false});
    }
}

// // @desc.      Get all bootcamps
// // @route.     GET /api/v1/bootcamps
// // @access.    Public
// exports.getBootCamps = (req, res, next) => {
//     res.status(200).json({ success: true, msg: 'Show all bootcamps' });
// }


// @desc.      Get bootcamp by Id
// @route.     GET /api/v1/bootcamps/:id
// @access.    Private
export async function getBootCamp(req, res, next) {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
         res.status(200).json({ success: true, 
            data: bootcamp });
    } catch(err) {
        res.status(400).json({ success: false});
    }
}

// @desc.      Create bootcamp
// @route.     POST /api/v1/bootcamps
// @access.    Private
export async function createBootCamp(req, res, next) {
  try {
    console.log("Incoming Request:", req.body);

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    console.error("Error creating bootcamp:", err.message);

    // Optional: Forward to error middleware
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
}

// @desc.      Update bootcamp by Id
// @route.     PUT /api/v1/bootcamps/:id
// @access.    Private
export async function updateBootCamp(req, res, next) {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if(!bootcamp) {
    return res.status(400).json({ success: false});
  }

  res.status(200).json({ success: true, data: bootcamp });
}

// @desc.      Delete bootcamp bu Id
// @route.     DELETE /api/v1/bootcamps/:id
// @access.    Private
export async function deleteBootCamp(req, res, next) {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp) {
            return res.status(400).json({ success: true, data: {}});
        }
    } catch(err) {
        res.status(400).json({ success: false });
    }
}