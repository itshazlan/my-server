import { Router } from 'express';
import { UploadComponent } from '../components';

const router: Router = Router();

router.get('/', UploadComponent.findAll);

router.post('/', UploadComponent.create);

router.get('/:id', UploadComponent.findOne);

router.delete('/:id', UploadComponent.remove);

export default router;
