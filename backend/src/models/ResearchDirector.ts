import mongoose, { Schema, Document } from 'mongoose';

export interface IResearchDirector extends Document {
  directorId: string;
  name: string;
  role: string;
  faculty: string;
  specialization: string;
  bio: string;
  photo: string | null;
  order: number;
}

const ResearchDirectorSchema = new Schema<IResearchDirector>({
  directorId: { type: String, required: true, unique: true },
  name:        { type: String, required: true },
  role:        { type: String, required: true },
  faculty:     { type: String, required: true },
  specialization: { type: String, default: '' },
  bio:         { type: String, default: '' },
  photo:       { type: String, default: null },
  order:       { type: Number, default: 0 },
});

export default mongoose.model<IResearchDirector>('ResearchDirector', ResearchDirectorSchema);
