// server/models/JourneyState.ts

import mongoose, { Document, Schema, Types, Model } from 'mongoose';

export interface INumericInputs {
  oilMassGrams?: number;
  naohGrams?: number;
  startTemp?: number;
  endTemp?: number;
  phLevel?: number;
}

export interface IJourneyState extends Document {
  squadId: Types.ObjectId;
  missionId: number;
  status: 'PENDING' | 'COMPLETED';
  observation: string;
  numericInputs: INumericInputs;
  evidenceUrl: string;
  xpEarned: number;
  completedAt: Date;
}

const JourneyStateSchema = new Schema<IJourneyState>(
  {
    squadId: {
      type: Schema.Types.ObjectId,
      ref: 'Squad',
      required: [true, 'Squad é obrigatório'],
      index: true,
    },
    missionId: {
      type: Number,
      required: [true, 'ID da missão é obrigatório'],
      min: [1, 'ID mínimo é 1'],
      max: [9, 'ID máximo é 9'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED'],
      default: 'PENDING',
    },
    observation: {
      type: String,
      trim: true,
      default: '',
    },
    numericInputs: {
      oilMassGrams: { type: Number, default: null },
      naohGrams: { type: Number, default: null },
      startTemp: { type: Number, default: null },
      endTemp: { type: Number, default: null },
      phLevel: { type: Number, default: null },
    },
    evidenceUrl: {
      type: String,
      default: '',
    },
    xpEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        if ('__v' in ret) delete ret.__v;
        return ret;
      },
    },
  }
);

// Índices — cada squad só pode ter um registro por missão
JourneyStateSchema.index({ squadId: 1, missionId: 1 }, { unique: true });

const JourneyState: Model<IJourneyState> =
  mongoose.models.JourneyState ||
  mongoose.model<IJourneyState>('JourneyState', JourneyStateSchema);

export default JourneyState;
export { JourneyState };
