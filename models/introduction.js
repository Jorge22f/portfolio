import {Schema, model, models} from 'mongoose';

const IntroductionSchema = new Schema({
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  label: {
    type: String,
    required: [true, 'Label is required']
  },
  order: {
    type: Number,
    required: [true, 'Order is required']
  }
});

const Introduction = models.Introduction || model('Introduction', IntroductionSchema);

export default  Introduction;
