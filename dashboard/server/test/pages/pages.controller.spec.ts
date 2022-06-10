import { Test, TestingModule } from '@nestjs/testing';
import { PagesController } from '../../src/pages/pages.controller';

describe('PagesController', () => {
    let controller: PagesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PagesController],
        }).compile();

        controller = module.get<PagesController>(PagesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
