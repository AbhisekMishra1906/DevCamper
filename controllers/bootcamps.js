import Bootcamp from "../models/Bootcamp.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from '../middleware/asyncHandler.js';
import geocoder from '../Utils/geocoder.js';


// @desc.      Get all bootcamps
// @route.     GET /api/v1/bootcamps
// @access.    Public
export const getBootCamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
});


// @desc.      Get bootcamp by Id
// @route.     GET /api/v1/bootcamps/:id
// @access.    Private
export const getBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp= await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: bootcamp });
});

// @desc.      Create bootcamp
// @route.     POST /api/v1/bootcamps
// @access.    Private2222
export const createBootCamp = asyncHandler(async (req,res,next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
});

// @desc.      Update bootcamp by Id
// @route.     PUT /api/v1/bootcamps/:id
// @access.    Private
export const updateBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: bootcamp });
});

// @desc.      Delete bootcamp by Id
// @route.     DELETE /api/v1/bootcamps/:id
// @access.    Private
export const deleteBootCamp = asyncHandler(async (req, res, next)=> {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp) {
        return res.status(400).json({ success: true, data: {}});
    }

    res.status(200).json({ success: true, data: bootcamp });
});

// @desc.      Get bootcamps within a radius
// @route.     GET /api/v1/bootcamps/radius/:zipcode:distance
// @access.    Private
export const getBootCampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/long from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calc radius using radians: Divide distance by radius
    // Earth radius: 3,963 miles/ 6378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});