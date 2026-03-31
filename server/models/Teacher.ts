import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  email: string;
  passwordHash: string;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      trim: true 
    },
    passwordHash: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

TeacherSchema.index({ email: 1 });

const Teacher: Model<ITeacher> = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
export default Teacher;
export { Teacher };
