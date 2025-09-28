// import mongoose from "mongoose";
// const movieSchema=new mongoose.Schema(
//     {
//         _id:{type:String,required:true},
//         title:{type:String,require:true},
//         overview:{type:String,require:true},
//         poster_path:{type:String,require:true},
//         backdrop_path:{type:String,require:true},
//         release_date:{type:String,require:true},
//         original_language:{type:String},
//         tagline:{type:String},
//         genres:{type:Array,require:true},
//         casts:{type:Array,require:true},
//         vote_average:{type:Number,require:true},
//         runtime:{type:Number,require:true}
// },{timestamps:true}
// )
// const Movie=mongoose.model("Movie",movieSchema)
// export default Movie

import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true },
    release_date: { type: String, required: true },
    original_language: { type: String },
    tagline: { type: String },
    genres: { type: Array, required: true },
    casts: { type: Array, required: true },
    vote_average: { type: Number, required: true },
    runtime: { type: Number, required: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema); // capital "M"
export default Movie;
