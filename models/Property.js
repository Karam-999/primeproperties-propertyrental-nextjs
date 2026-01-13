import { Schema, model, models } from 'mongoose';
// import { unique } from 'next/dist/build/utils';

const PropertySchhema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId, //this will store the id of the user who created the property
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    ownerName: {
      type: String,
      required: [true, 'Owner name is required'],
    },
    ownerEmail: {
      type: String,
      required: [true, 'Owner email is required'],
    },
    propName: {
      type: String,
      required: [true, 'Property name is required'],
    },
    propType: {
      type: String,
      required: [true, 'Property type is required'],
    },
    propDescription: {
      type: String,
      required: [true, 'Property description is required'],
    },
    propLocation: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property = models.Property || model('Property', PropertySchhema); //this will check if the model already exists, if it does, it will use the existing model, otherwise it will create a new one.
export default Property;

// minified code (shrink js)
// import{Schema as e,model as r,models as t}from"mongoose";let PropertySchhema=new e({owner:{type:e.Types.ObjectId,ref:"User",required:[!0,"Owner is required"]},propName:{type:String,required:[!0,"Property name is required"]},propType:{type:String,required:[!0,"Property type is required"]},propDescription:{type:String,required:[!0,"Property description is required"]},propLocation:{street:String,city:String,state:String,zipcode:String},beds:{type:Number,required:!0},baths:{type:Number,required:!0},square_feet:{type:Number,required:!0},amenities:[{type:String},],rates:{nightly:Number,weekly:Number,monthly:Number},seller_info:{name:String,email:String,phone:String},images:[{type:String},],is_featured:{type:Boolean,default:!1}},{timestamps:!0}),Property=t.Property||r("Property",PropertySchhema);export default Property;
