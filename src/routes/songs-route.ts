import express from 'express';

const router = express.Router();

router.get('/search', (req, res) => {
  // try {
  //     const newPatientRequest = toNewPatientRequest(req.body);
  //     const newPatient = PatientsService.addPatient(newPatientRequest);
  //     res.status(200).json(newPatient);
  // } catch (error : any) {
  //     console.log('request', req.body);
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     res.status(400).json({ error: error.message });
  // }

  res.status(200).json({ error: 'Search Not yet implemented' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ error: 'Song get Not yet implemented' });
});

export default router;
