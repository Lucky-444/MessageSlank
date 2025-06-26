import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).json({
    message: 'Getting all Users',
    success: true
  });
});

export default router;
