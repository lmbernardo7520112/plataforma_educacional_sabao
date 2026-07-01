// server/models/Squad.ts

import mongoose, { Document, Schema, Types, Model } from 'mongoose';

export interface ISquad extends Document {
  nome: string;
  classroomId: Types.ObjectId;
  members: string[];
  ativo: boolean;
  criadoEm: Date;
  accessCodeHash?: string;
  createdByTeacherId?: Types.ObjectId;
}

const SquadSchema = new Schema<ISquad>(
  {
    nome: {
      type: String,
      required: [true, 'Nome do grupo é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome do grupo não pode exceder 100 caracteres'],
    },
    classroomId: {
      type: Schema.Types.ObjectId,
      ref: 'Classroom',
      required: [true, 'Turma é obrigatória'],
      index: true,
    },
    members: {
      type: [String],
      required: [true, 'Membros são obrigatórios'],
      validate: {
        validator: function (v: string[]) {
          return v.length >= 0 && v.length <= 5;
        },
        message: 'O grupo deve ter no máximo 5 membros',
      },
    },
    ativo: {
      type: Boolean,
      default: true,
      index: true,
    },
    criadoEm: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    accessCodeHash: {
      type: String,
      select: false, // Never returned in queries by default — security
      index: true,
    },
    createdByTeacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'criadoEm',
    },
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        if ('__v' in ret) delete ret.__v;
        return ret;
      },
    },
  }
);

// Índices
SquadSchema.index({ classroomId: 1, nome: 1 });

const Squad: Model<ISquad> =
  mongoose.models.Squad || mongoose.model<ISquad>('Squad', SquadSchema);

export default Squad;
export { Squad };
