import { Router } from 'express';
import { MissionService } from '../services/missionService.ts';
import { upload } from '../middleware/upload.ts';
import { validate } from '../middleware/validate.ts';
import { SubmitMissionSchema } from '../schemas/mission.schema.ts';

const router = Router({ mergeParams: true });
const missionService = new MissionService();

router.get('/', async (req, res) => {
  try {
    const { squadId } = req.params as { squadId: string };
    const missions = await missionService.getSquadMissions(squadId);
    res.status(200).json({ success: true, data: missions });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/submit', upload.single('evidencePhoto'), validate(SubmitMissionSchema), async (req, res) => {
  try {
    const { squadId } = req.params;
    const { missionId, scientificMethod, numericInputs } = req.body;
    const file = req.file;

    // Relacionamento persistente no storage Docker /uploads
    const evidenceUrl = file ? `/uploads/${file.filename}` : undefined;

    const missionDoc = await missionService.evaluateAndCompleteMission(
      squadId as string,
      missionId as number,
      scientificMethod || {},
      numericInputs || {},
      evidenceUrl
    );

    res.status(200).json({
      success: true,
      data: missionDoc,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Falha Catastrófica de Motor de Validação.',
    });
  }
});

export default router;
