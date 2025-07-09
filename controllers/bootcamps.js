// @desc.      Get all bootcamps
// @route.     GET /api/v1/bootcamps
// @access.    Public
export function getBootCamps(req, res, next) {
    res.status(200).json({ success: true, msg: 'Show all bootcamps' });
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
export function getBootCamp(req, res, next) {
    res
    .status(200)
    .json({ success: true, 
            msg: `Show bootcamp ${req.params.id}` });
}

// @desc.      Create bootcamp
// @route.     POST /api/v1/bootcamps
// @access.    Private
export function createBootCamp(req, res, next) {
    res.status(200).json({ success: true, msg: 'Create new bootcamp' });
}

// @desc.      Update bootcamp by Id
// @route.     PUT /api/v1/bootcamps/:id
// @access.    Private
export function updateBootCamp(req, res, next) {
    res.status(200).json({ success: true,
                           msg: `Update bootcamp ${req.params.id}` });
}

// @desc.      Delete bootcamp bu Id
// @route.     DELETE /api/v1/bootcamps/:id
// @access.    Private
export function deleteBootCamp(req, res, next) {
    res.status(200).json({ success: true, 
                           msg: `Delete bootcamp ${req.params.id}` });
}