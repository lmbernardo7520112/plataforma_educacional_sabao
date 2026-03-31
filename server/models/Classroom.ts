// server/models/Classroom.ts

import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IClassroom extends Document {
  nome: string;
  ano: number;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
  qtdSquads?: number;
}

const ClassroomSchema = new Schema<IClassroom>(
  {
    nome: {
      type: String,
      required: [true, 'Nome da turma é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome da turma não pode exceder 100 caracteres'],
    },
    ano: {
      type: Number,
      required: [true, 'Ano é obrigatório'],
      min: [2000, 'Ano deve ser maior ou igual a 2000'],
      max: [2100, 'Ano deve ser menor ou igual a 2100'],
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
    atualizadoEm: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
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
ClassroomSchema.index({ nome: 1, ano: 1 }, { unique: true });
ClassroomSchema.index({ ano: -1 });

// Hook automático
ClassroomSchema.pre('save', function (next) {
  this.atualizadoEm = new Date();
  next();
});

const Classroom: Model<IClassroom> =
  mongoose.models.Classroom || mongoose.model<IClassroom>('Classroom', ClassroomSchema);

export default Classroom;
export { Classroom };
