import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Review', ReviewSchema);


